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

    pub attachment RPGCharacter for NonFungibleToken.INFT {
        pub let name: String
        pub let attributes: AttributePoints
        init(
            name: String,
            attributes: AttributePoints
        ) {
            self.name = name
            self.attributes = attributes
        }
    }

    pub fun attachRPGCharacter(
        nft: @{NonFungibleToken.INFT},
        name: String,
        attributes: AttributePoints
    ): @{NonFungibleToken.INFT} {
        return <- attach RPGCharacter(
            name: name,
            attributes: attributes
        ) to <- nft
    }

    init() {
        emit ContractInitialized()
    }
}
 