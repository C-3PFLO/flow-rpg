import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

pub fun main(address: Address): [UInt64] {
    let publicCollection
        = getAccount(address)
            .getCapability(MyExampleNFT.CollectionPublicPath)
            .borrow<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
    return publicCollection.getIDs()
}
