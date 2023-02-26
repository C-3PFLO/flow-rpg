import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

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
    return {
        "name": rpg.getName(),
        "alignment": rpg.getAlignment(),
        "classID": rpg.getClassID(),
        "class": rpg.getClass(),
        "attributes": rpg.getAttributes()
    }
}