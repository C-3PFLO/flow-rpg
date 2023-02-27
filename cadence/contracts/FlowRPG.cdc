import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub contract FlowRPG {

    pub var totalSupply: UInt64
    pub var classes: {String: Class}
    pub let GameKeeperStoragePath: StoragePath

    pub event ContractInitialized()
    pub event Minted() // TODO

    pub enum Attribute: UInt64 {
        pub case strength
        pub case dexterity
        pub case constitution
        pub case intelligence
        pub case wisdom
        pub case charisma
    }

    pub enum AttackAbility: UInt64 {
        pub case melee
        pub case ranged
        pub case spell
    }

    pub fun calculatePointBuy(
        strength: UInt64,
        dexterity: UInt64,
        constitution: UInt64,
        intelligence: UInt64,
        wisdom: UInt64,
        charisma: UInt64) : UInt64 {
        let pointCost: {UInt64: UInt64} = {
            8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
        }
        return pointCost[strength]! +
            pointCost[dexterity]! +
            pointCost[constitution]! +
            pointCost[intelligence]! +
            pointCost[wisdom]! +
            pointCost[charisma]!
    }

    pub fun getClassFromID(classID: String): FlowRPG.Class {
        return self.classes[classID]!
    }

    // base scores excluding any modifiers
    pub struct AttributePoints {
        pub var strength: UInt64
        pub var dexterity: UInt64
        pub var constitution: UInt64
        pub var intelligence: UInt64
        pub var wisdom: UInt64
        pub var charisma: UInt64
        init(
            strength: UInt64,
            dexterity: UInt64,
            constitution: UInt64,
            intelligence: UInt64,
            wisdom: UInt64,
            charisma: UInt64,
        ) {
            // attributes must follow point-buy rules during initialization
            // https://www.dndbeyond.com/sources/basic-rules/step-by-step-characters#3DetermineAbilityScores
            pre {
                // <= 15
                strength <= 15 : "exceeds maximum initial value"
                dexterity <= 15 : "exceeds maximum initial value"
                constitution <= 15 : "exceeds maximum initial value"
                intelligence <= 15 : "exceeds maximum initial value"
                wisdom <= 15 : "exceeds maximum initial value"
                charisma <= 15 : "exceeds maximum initial value"
                // >= 8
                strength >= 8 : "less than minimum initial value"
                dexterity >= 8 : "less than minimum initial value"
                constitution >= 8 : "less than minimum initial value"
                intelligence >= 8 : "less than minimum initial value"
                wisdom >= 8 : "less than minimum initial value"
                charisma >= 8 : "less than minimum initial value"
                // <= 27 points spent
                FlowRPG.calculatePointBuy(
                    strength: strength,
                    dexterity: dexterity,
                    constitution: constitution,
                    intelligence: intelligence,
                    wisdom: wisdom,
                    charisma: charisma
                ) <= 27 : "exceeds maximum total points"
            }
            self.strength = strength
            self.dexterity = dexterity
            self.constitution = constitution
            self.intelligence = intelligence
            self.wisdom = wisdom
            self.charisma = charisma
        }
    }

    pub struct Class {
        pub let name: String
        pub let description: String
        pub let bonuses: [Attribute]
        pub let savingThrows: [Attribute]
        pub let attackAbilities: [AttackAbility]
        pub let initialHitPoints: Int64
        init(
            name: String,
            description: String,
            bonuses: [Attribute],
            savingThrows: [Attribute],
            attackAbilities: [AttackAbility],
            initialHitPoints: Int64
        ) {
            self.name = name
            self.description = description
            self.bonuses = bonuses
            self.savingThrows = savingThrows
            self.attackAbilities = attackAbilities
            self.initialHitPoints = initialHitPoints
        }
    }

    pub resource interface Public {
        pub var name: String
        pub let classID: String
        pub let alignment: String
        pub let attributes: AttributePoints
        pub var hitPoints: Int64

        pub fun getName(): String
        pub fun getClassID(): String
        pub fun getClass(): Class
        pub fun getAlignment(): String
        pub fun getAttributes(): AttributePoints
        pub fun getHitPoints(): Int64
    }

    pub resource interface Private {
        pub fun setName(name: String)
    }

    // Custom MetadataView
    pub struct RPGCharacterView {
        pub let name: String
        pub let alignment: String
        pub let classID: String
        pub let class: FlowRPG.Class
        pub let attributes: AttributePoints
        pub let hitPoints: Int64

        init(
            name: String,
            alignment: String,
            classID: String,
            class: FlowRPG.Class,
            attributes: AttributePoints,
            hitPoints: Int64 ) {
            self.name = name
            self.alignment = alignment
            self.classID = classID
            self.class = class
            self.attributes = attributes
            self.hitPoints = hitPoints
        }
    }

    pub attachment RPGCharacter for NonFungibleToken.INFT: Public, Private, MetadataViews.Resolver {
        pub var name: String
        pub let alignment: String
        pub let classID: String
        pub let attributes: AttributePoints
        pub var hitPoints: Int64

        // Public
        pub fun getName(): String {
            return self.name
        }

        pub fun getClassID(): String {
            return self.classID
        }

        pub fun getClass(): FlowRPG.Class {
            return FlowRPG.getClassFromID(classID: self.classID)
        }

        pub fun getAlignment(): String {
            return self.alignment
        }

        pub fun getAttributes(): AttributePoints {
            return self.attributes
        }

        pub fun getHitPoints(): Int64 {
            return self.hitPoints
        }

        // Private
        pub fun setName(name: String) {
            self.name = name
        }

        // Resolver
        pub fun getViews() : [Type] {
            var views : [Type]=[]
            // TODO: relay base views
            views.append(Type<MetadataViews.Display>())
            views.append(Type<FlowRPG.RPGCharacterView>())
            // TODO: additional views
            return views
        }

        pub fun resolveView(_ type: Type): AnyStruct? {
            let class = self.getClass()
            switch type {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.getName(),
                        // TODO: use class description as a placeholder
                        description: class == nil ? "" : class.description,
                        // TODO: get from base when provided
                        thumbnail: MetadataViews.HTTPFile(
                            url: ""
                        )
                    )
                case Type<FlowRPG.RPGCharacterView>():
                    return FlowRPG.RPGCharacterView(
                        name: self.getName(),
                        alignment: self.getAlignment(),
                        classID: self.getClassID(),
                        class: self.getClass(),
                        attributes: self.getAttributes(),
                        hitPoints: self.getHitPoints()
                    )
                default:
                    return nil
            }
        }

        // Admin only
        access(contract) fun updateHitPoints(delta: Int64) {
            self.hitPoints = self.hitPoints + delta
        }

        init(
            name: String,
            alignment: String,
            classID: String,
            attributes: AttributePoints ) {
            pre {
                FlowRPG.classes[classID] != nil : "classID does not exist"
            }
            FlowRPG.totalSupply = FlowRPG.totalSupply + 1
            self.name = name
            self.alignment = alignment
            self.classID = classID
            self.attributes = attributes
            self.hitPoints = FlowRPG.classes[classID]!.initialHitPoints
        }
    }

    // only the owner of an nft can 'attach' something to it
    // and an attachment must be created in the statement where it is attached
    // thus we cannot use something like a minter pattern, where
    // only an admin user can mint an RPGCharacter and send it to users
    // 
    // if this were to be gated or monetized, that would have to happen
    // within this public function
    pub fun attachRPGCharacter(
        nft: @{NonFungibleToken.INFT},
        name: String,
        alignment: String,
        classID: String,
        attributes: AttributePoints ): @{NonFungibleToken.INFT} {
        emit Minted() // TODO
        return <- attach RPGCharacter(
            name: name,
            alignment: alignment,
            classID: classID,
            attributes: attributes
        ) to <- nft
    }

    pub resource GameKeeper {
        // TODO: test that this is only accessible by GameKeeper
        pub fun updateHitPoints(char: &FlowRPG.RPGCharacter, delta: Int64) {
            char.updateHitPoints(delta: delta)
        }
        // TODO: test
        pub fun addClass(
            classID: String,
            name: String,
            description: String,
            bonuses: [Attribute],
            savingThrows: [Attribute],
            attackAbilities: [AttackAbility],
            initialHitPoints: Int64 ) {
            pre {
                FlowRPG.classes[classID] == nil : "classID exists"
            }
            FlowRPG.classes[classID] = FlowRPG.Class(
                name: name,
                description: description,
                bonuses: bonuses,
                savingThrows: savingThrows,
                attackAbilities: attackAbilities,
                initialHitPoints: initialHitPoints
            )
        }
        pub fun createGameKeeper(): @GameKeeper {
            return <- create GameKeeper()
        }
    }

    init() {
        self.totalSupply = 0

        self.GameKeeperStoragePath = /storage/FlowRPGGameKeeperV1
        self.account.save(<- create GameKeeper(), to: self.GameKeeperStoragePath)

        // TODO: move to a startup transaction
        self.classes = {
            "wizard-v1": FlowRPG.Class(
                name: "Wizard",
                description: "... to do ...",
                bonuses: [Attribute.intelligence, Attribute.wisdom],
                savingThrows: [Attribute.intelligence],
                attackAbilities: [AttackAbility.spell],
                initialHitPoints: 8
            ),
            "sorcerer-v1": FlowRPG.Class(
                name: "Sorcerer",
                description: "... to do ...",
                bonuses: [Attribute.charisma, Attribute.intelligence],
                savingThrows: [Attribute.charisma],
                attackAbilities: [AttackAbility.spell],
                initialHitPoints: 6
            ),
            "barbarian-v1": FlowRPG.Class(
                name: "Barbarian",
                description: "... to do ...",
                bonuses: [Attribute.strength, Attribute.constitution],
                savingThrows: [Attribute.strength],
                attackAbilities: [AttackAbility.melee],
                initialHitPoints: 14
            ),
            "ranger-v1": FlowRPG.Class(
                name: "Ranger",
                description: "... to do ...",
                bonuses: [Attribute.dexterity, Attribute.constitution],
                savingThrows: [Attribute.dexterity],
                attackAbilities: [AttackAbility.ranged],
                initialHitPoints: 10
            ),
            "rogue-v1": FlowRPG.Class(
                name: "Rogue",
                description: "... to do ...",
                bonuses: [Attribute.dexterity, Attribute.strength],
                savingThrows: [Attribute.dexterity],
                attackAbilities: [AttackAbility.melee, AttackAbility.ranged],
                initialHitPoints: 12
            )
        }

        emit ContractInitialized()
    }
}
 