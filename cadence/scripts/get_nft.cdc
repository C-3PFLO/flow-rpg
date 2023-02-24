import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

pub fun main(address: Address, id: UInt64): &MyExampleNFT.NFT {
    let publicCollection
        = getAccount(address)
            .getCapability(MyExampleNFT.CollectionPublicPath)
            .borrow<&MyExampleNFT.Collection{MyExampleNFT.CollectionPublic}>()!
    let nft = publicCollection.borrowAuthNFT(id: id)
    return nft
}
