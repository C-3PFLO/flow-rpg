import NonFungibleToken from "./NonFungibleToken.cdc"

pub contract FlowRPG {

    pub event ContractInitialized()

    pub attachment RPGCharacter for NonFungibleToken.INFT {
        pub let background: String
        init(_background: String) {
            self.background = _background
        }
    }

    pub fun attachRPGCharacter(nft: @{NonFungibleToken.INFT}, background: String): @{NonFungibleToken.INFT} {
        return <- attach RPGCharacter(_background: background) to <- nft
    }

    init() {
        emit ContractInitialized()
    }
}
 