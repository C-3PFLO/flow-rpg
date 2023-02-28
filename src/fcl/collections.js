/* eslint-disable max-len */
import * as fcl from '@onflow/fcl';

/**
* @public
* @param {String} address
* @return {Promise}
*/
export function fetchCollections(address) {
    const cadence = `
        import NonFungibleToken from 0xAdmin
        
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
    `;
    const args = (arg, t) => [
        arg(address, t.Address),
    ];
    return fcl.query({ cadence, args }).then((response) => {
        return Promise.resolve(response === 0 ? null : response);
    });
}
