import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(collectionStoragePath: StoragePath, collectionPublicPath: PublicPath, itemID: UInt64, background: String) {

    let receiverCapability: Capability<&{NonFungibleToken.Receiver}>
    var nft: @{NonFungibleToken.INFT}

    prepare(acct: AuthAccount) {
        // store retriever to deposit nft after attachment
        self.receiverCapability = acct.getCapability<&AnyResource{NonFungibleToken.Receiver}>(collectionPublicPath)
            assert(
                self.receiverCapability.check(),
                message: "Could not access Receiver Capability at the given path for this account!"
            )
        // get nft from provider
        let providerReference = acct.borrow<&{NonFungibleToken.Provider}>(
            from: collectionStoragePath
        )!
        self.nft <- providerReference.withdraw(withdrawID: itemID)
    }

    execute {
        let rpgNFT <- FlowRPG.attachRPGCharacter(
            nft: <- self.nft,
            background: background
        ) as! @NonFungibleToken.NFT
        self.receiverCapability.borrow()!.deposit(token: <- rpgNFT)
    }
}
