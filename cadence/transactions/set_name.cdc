import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(
    collectionStoragePath: StoragePath,
    itemID: UInt64,
    name: String
) {

    var nft: &NonFungibleToken.NFT

    prepare(acct: AuthAccount) {
        let publicCollection = acct.borrow<&AnyResource{NonFungibleToken.CollectionPublic}>(
            from: collectionStoragePath
        )!
        self.nft = publicCollection.borrowNFT(id: itemID)
    }

    execute {
        self.nft[FlowRPG.RPGCharacter]!.setName(name: name)
    }
}
 