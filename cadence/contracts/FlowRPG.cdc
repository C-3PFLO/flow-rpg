import NonFungibleToken from "./NonFungibleToken.cdc"

pub contract FlowRPG {

    pub event ContractInitialized()

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
            // enforce global rules here, but defer rules like
            // point-buy for when creating character
            pre {
                // less than 20
                strength <= 20 : "exceeds max attribute score"
                dexterity <= 20 : "exceeds max attribute score"
                constitution <= 20 : "exceeds max attribute score"
                intelligence <= 20 : "exceeds max attribute score"
                wisdom <= 20 : "exceeds max attribute score"
                charisma <= 20 : "exceeds max attribute score"
                // more than 0
                strength >= 0 : "less than minimum attribute score"
                dexterity >= 0 : "less than minimum attribute score"
                constitution >= 0 : "less than minimum attribute score"
                intelligence >= 0 : "less than minimum attribute score"
                wisdom >= 0 : "less than minimum attribute score"
                charisma >= 0 : "less than minimum attribute score"
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
 