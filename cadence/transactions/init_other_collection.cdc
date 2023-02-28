import MyOtherExampleNFT from "../contracts/MyOtherExampleNFT.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        signer.save(
            <- MyOtherExampleNFT.createEmptyCollection(),
            to: MyOtherExampleNFT.CollectionStoragePath
        )
        signer.link<&MyOtherExampleNFT.Collection{NonFungibleToken.CollectionPublic,
                                             NonFungibleToken.Receiver,
                                             MyOtherExampleNFT.CollectionPublic}>(
            MyOtherExampleNFT.CollectionPublicPath,
            target: MyOtherExampleNFT.CollectionStoragePath
        )
    }
}
