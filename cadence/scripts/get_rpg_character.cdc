import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

pub fun main(address: Address, collectionPublicPath: PublicPath, id: UInt64): FlowRPG.AttributePoints {
    let account = getAccount(address)
    let publicCollectionReference = account.getCapability(collectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()!
    let nft = publicCollectionReference.borrowNFT(id: id)
    return nft[FlowRPG.RPGCharacter]!.attributes;
}