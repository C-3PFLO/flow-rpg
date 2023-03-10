import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub fun main(
        address: Address,
        collectionPublicPath: PublicPath,
        id: UInt64
    ): AnyStruct {
    let nft = getAccount(address)
        .getCapability(collectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()!
        .borrowNFT(id: id)
    let rpg = nft[FlowRPG.RPGCharacter]!
    return rpg.resolveView(
        Type<MetadataViews.Display>()
    )
}