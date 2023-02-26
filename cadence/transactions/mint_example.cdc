import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(recipient: Address, name: String, imageURL: String) {

    prepare(signer: AuthAccount) {
        let minter = 
            signer.borrow<&MyExampleNFT.Minter>(
                from: MyExampleNFT.MinterStoragePath
            )!
        let nft <- minter.createNFT(
            name: name,
            imageURL: imageURL
        )
        let recipientsCollection = getAccount(recipient)
            .getCapability(MyExampleNFT.CollectionPublicPath)
            .borrow<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
        recipientsCollection.deposit(token: <- nft)
    }
}
