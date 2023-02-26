/* eslint-disable max-len */
import * as fcl from '@onflow/fcl';

/**
* @public
* @param {String} address
* @return {Promise}
*/
export function checkCollection(address) {
    const cadence = `
        import MyExampleNFT from 0xAdmin

        pub fun main(address: Address): Bool {
            return getAccount(address)
                .getCapability<&AnyResource{MyExampleNFT.CollectionPublic}>(MyExampleNFT.CollectionPublicPath)
                .check()
        }
    `;
    const args = (arg, t) => [
        arg(address, t.Address),
    ];
    return fcl.query({ cadence, args }).then((response) => {
        return Promise.resolve(response === 0 ? null : response);
    });
}

/**
* @public
* @param {String} address
* @return {Promise}
*/
export function getIDs(address) {
    const cadence = `
        import MyExampleNFT from 0xAdmin
        import NonFungibleToken from 0xAdmin

        pub fun main(address: Address): [UInt64] {
            let publicCollection = getAccount(address)
            let capability = publicCollection.getCapability(MyExampleNFT.CollectionPublicPath)
            let reference = capability.borrow<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
            return reference.getIDs()
        }
    `;
    const args = (arg, t) => [
        arg(address, t.Address),
    ];
    return fcl.query({ cadence, args }).then((response) => {
        return Promise.resolve(response === 0 ? null : response);
    });
}
