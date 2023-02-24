import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(recipient: Address, name: String, luckyNumber: Int) {

    prepare(signer: AuthAccount) {
        let minter = 
            signer.borrow<&MyExampleNFT.Minter>(
                from: MyExampleNFT.MinterStoragePath
            )!
        let nft <- minter.createNFT(
            name: name,
            luckyNumber: luckyNumber
        )
        let recipientsCollection = getAccount(recipient)
            .getCapability(MyExampleNFT.CollectionPublicPath)
            .borrow<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
        recipientsCollection.deposit(token: <- nft)
    }
}
