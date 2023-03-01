import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

// NOTE: this function is heavily based on a community provided script and is not
// original to this project
pub fun main(address: Address): [AnyStruct] {
    let authAccount: AuthAccount = getAuthAccount(address)
    let collections: [AnyStruct] = []

    let iterateFunc: ((StoragePath, Type): Bool) = fun (path: StoragePath, type: Type): Bool {
        if type.isSubtype(of: Type<@NonFungibleToken.Collection>()) {
            let nfts: [&NonFungibleToken.NFT] = []
            let collection = authAccount.borrow<&NonFungibleToken.Collection>(from: path)!
            for id in collection.getIDs() {
                nfts.append(collection.borrowNFT(id: id))
            }
            // returning the path and array of nfts in the collection at that path is original
            // and required for creating "pointers" to the NFTs when attaching later
            collections.append({
                "path": path,
                "nfts": nfts
            })
        }
        return true
    }

    authAccount.forEachStored(iterateFunc)

    return collections
}