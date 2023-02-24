import MyExampleNFT from "../contracts/MyExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        signer.save(
            <- MyExampleNFT.createEmptyCollection(),
            to: MyExampleNFT.CollectionStoragePath
        )
        signer.link<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MyExampleNFT.CollectionPublic}>(
            MyExampleNFT.CollectionPublicPath,
            target: MyExampleNFT.CollectionStoragePath
        )
    }
}
