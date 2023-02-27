import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub fun main(address: Address, id: UInt64): AnyStruct {
    let publicCollection
        = getAccount(address)
            .getCapability(MyExampleNFT.CollectionPublicPath)
            .borrow<&MyExampleNFT.Collection{MyExampleNFT.CollectionPublic}>()!
    let nft = publicCollection.borrowAuthNFT(id: id)
    return nft.resolveView(
        Type<MetadataViews.Display>()
    )
}
