import NonFungibleToken from "./NonFungibleToken.cdc"

pub contract FlowRPG {

    pub event ContractInitialized()

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

    // base scores excluding any modifiers
    pub struct AttributePoints {
        pub let strength: UInt64
        pub let dexterity: UInt64
        pub let constitution: UInt64
        pub let intelligence: UInt64
        pub let wisdom: UInt64
        pub let charisma: UInt64
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

    pub struct Class {
        pub let name: String
        pub let description: String
        pub let bonuses: [Attribute]
        pub let savingThrows: [Attribute]
        pub let attackAbilities: [AttackAbility]
        init(
            name: String,
            description: String,
            bonuses: [Attribute],
            savingThrows: [Attribute],
            attackAbilities: [AttackAbility]
        ) {
            self.name = name
            self.description = description
            self.bonuses = bonuses
            self.savingThrows = savingThrows
            self.attackAbilities = attackAbilities
        }
    }

    pub let classes: {String: Class}

    pub attachment RPGCharacter for NonFungibleToken.INFT {
        pub let name: String
        pub let attributes: AttributePoints
        pub let classID: String
        pub let alignment: String
        init(
            name: String,
            attributes: AttributePoints,
            classID: String,
            alignment: String
        ) {
            self.name = name
            self.attributes = attributes
            self.classID = classID
            self.alignment = alignment
        }
    }

    pub fun getClassFromID(classID: String): FlowRPG.Class {
        return self.classes[classID]!
    }

    pub fun attachRPGCharacter(
        nft: @{NonFungibleToken.INFT},
        name: String,
        attributes: AttributePoints,
        classID: String,
        alignment: String
    ): @{NonFungibleToken.INFT} {
        return <- attach RPGCharacter(
            name: name,
            attributes: attributes,
            classID: classID,
            alignment: alignment
        ) to <- nft
    }

    init() {
        emit ContractInitialized()
        self.classes = {
            "wizard": FlowRPG.Class(
                name: "Wizard",
                description: "to do ...",
                bonuses: [Attribute.intelligence, Attribute.wisdom],
                savingThrows: [Attribute.intelligence],
                attackAbilities: [AttackAbility.spell]
            ),
            "sorcerer": FlowRPG.Class(
                name: "Sorcerer",
                description: "to do ...",
                bonuses: [Attribute.charisma, Attribute.intelligence],
                savingThrows: [Attribute.constitution],
                attackAbilities: [AttackAbility.spell]
            ),
            "barbarian": FlowRPG.Class(
                name: "Barbarian",
                description: "to do ...",
                bonuses: [Attribute.strength, Attribute.constitution],
                savingThrows: [Attribute.strength],
                attackAbilities: [AttackAbility.melee]
            ),
            "ranger": FlowRPG.Class(
                name: "Ranger",
                description: "to do ...",
                bonuses: [Attribute.dexterity, Attribute.constitution],
                savingThrows: [Attribute.dexterity],
                attackAbilities: [AttackAbility.ranged]
            ),
            "rogue": FlowRPG.Class(
                name: "Rogue",
                description: "to do ...",
                bonuses: [Attribute.dexterity],
                savingThrows: [Attribute.dexterity],
                attackAbilities: [AttackAbility.melee, AttackAbility.ranged]
            )
        }
    }
}
 