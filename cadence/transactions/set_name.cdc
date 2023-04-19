import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(
    collectionStoragePath: StoragePath,
    itemID: UInt64,
    name: String
) {

    var rpg: &FlowRPG.RPGCharacter

    prepare(acct: AuthAccount) {
        let collection = acct.borrow<&AnyResource{NonFungibleToken.CollectionPublic}>(
            from: collectionStoragePath
        )!
        let nft = collection.borrowNFT(id: itemID)
        self.rpg = nft[FlowRPG.RPGMixin]!.borrowCharacter()
    }

    execute {
        self.rpg.setName(name: name)
    }
}
 