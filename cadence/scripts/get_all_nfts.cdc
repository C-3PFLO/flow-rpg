import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

// Iterate over all
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