import NonFungibleToken from "./NonFungibleToken.cdc"

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
        charisma: UInt64,
    ) : UInt64 {
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
        pub let initialHitPoints: UInt64
        init(
            name: String,
            description: String,
            bonuses: [Attribute],
            savingThrows: [Attribute],
            attackAbilities: [AttackAbility],
            initialHitPoints: UInt64
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
        pub var hitPoints: UInt64

        pub fun getName(): String
        pub fun getClassID(): String
        pub fun getClass(): Class
        pub fun getAlignment(): String
        pub fun getAttributes(): AttributePoints
        pub fun getHitPoints(): UInt64
    }

    pub resource interface Private {
        pub fun setName(name: String)
    }

    pub attachment RPGCharacter for NonFungibleToken.INFT: Public, Private {
        pub var name: String
        pub let classID: String
        pub let alignment: String
        pub let attributes: AttributePoints
        pub var hitPoints: UInt64

        pub fun getName(): String {
            return self.name
        }

        pub fun setName(name: String) {
            self.name = name
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

        pub fun getHitPoints(): UInt64 {
            return self.hitPoints
        }

        // Admin only
        access(contract) fun updateHitPoints(delta: UInt64) {
            self.hitPoints = self.hitPoints + delta
        }

        init(
            name: String,
            attributes: AttributePoints,
            classID: String,
            alignment: String
        ) {
            FlowRPG.totalSupply = FlowRPG.totalSupply + 1
            self.name = name
            self.attributes = attributes
            // TODO: validate classID in FlowRPG.classes
            self.classID = classID
            self.alignment = alignment
            // TODO: get hitPoints from class instead
            self.hitPoints = 10
        }
    }

    // only the older of an nft can 'attach' something to it
    // and an attachment must be created in the statement where it is attached
    // thus we cannot use something like a minter pattern, where
    // only an admin user can mint an RPGCharacter and send it to users
    // if this were to be gated or monetized, that would have to happen
    // within this public function
    pub fun attachRPGCharacter(
        nft: @{NonFungibleToken.INFT},
        name: String,
        attributes: AttributePoints,
        classID: String,
        alignment: String ): @{NonFungibleToken.INFT} {
        emit Minted() // TODO
        return <- attach RPGCharacter(
            name: name,
            attributes: attributes,
            classID: classID,
            alignment: alignment
        ) to <- nft
    }

    pub resource GameKeeper {
        // TODO: test that this is only accessible by GameKeeper
        pub fun updateHitPoints(char: &FlowRPG.RPGCharacter, delta: UInt64) {
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
            initialHitPoints: UInt64 ) {
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
 