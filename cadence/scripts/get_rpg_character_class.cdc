import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

pub fun main(
        address: Address,
        collectionPublicPath: PublicPath,
        id: UInt64
    ): FlowRPG.Class {
    let nft = getAccount(address)
        .getCapability(collectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()!
        .borrowNFT(id: id)
    let classID = nft[FlowRPG.RPGCharacter]!.classID;
    return FlowRPG.getClassFromID(classID: classID);
}