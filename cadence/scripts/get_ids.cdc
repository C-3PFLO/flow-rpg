import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

pub fun main(
    address: Address,
    collectionPublicPath: PublicPath
    ): [UInt64] {
    let publicCollection
        = getAccount(address)
            .getCapability(collectionPublicPath)
            .borrow<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
    return publicCollection.getIDs()
}
