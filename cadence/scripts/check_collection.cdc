import MyExampleNFT from "../contracts/MyExampleNFT.cdc"

pub fun main(address: Address): Bool {
    return getAccount(address)
        .getCapability<&AnyResource{MyExampleNFT.CollectionPublic}>(MyExampleNFT.CollectionPublicPath)
        .check()
}
