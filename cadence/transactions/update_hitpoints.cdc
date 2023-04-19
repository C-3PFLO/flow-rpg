import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(
    user: Address,
    // collectionStoragePath: StoragePath,
    collectionPublicPath: PublicPath,
    itemID: UInt64,
    delta: Int64
) {

    var rpg: &FlowRPG.RPGCharacter
    var gameKeeper: &FlowRPG.GameKeeper

    prepare(signer: AuthAccount) {
        // get admin
        self.gameKeeper = signer.borrow<&FlowRPG.GameKeeper>(
            from: FlowRPG.GameKeeperStoragePath
        )!
        // get nft
        let nft = getAccount(user)
            .getCapability<&AnyResource{NonFungibleToken.CollectionPublic}>(collectionPublicPath)
            .borrow()!
            .borrowNFT(id: itemID)
        self.rpg = nft[FlowRPG.RPGMixin]!.borrowCharacter()
    }

    execute {
        self.gameKeeper.updateHitPoints(
            char: self.rpg,
            delta: delta
        )
    }
}
 