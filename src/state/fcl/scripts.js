/* eslint-disable max-len */
import * as fcl from '@onflow/fcl';

/**
* @public
* @param {String} address
* @param {String} collectionPublicPath
* @param {Integer} itemID
* @return {Promise}
*/
export function getRPGCharacter(address, collectionPublicPath, itemID) {
    const cadence = `
        import FlowRPG from 0xAdmin
        import NonFungibleToken from 0xAdmin
        
        pub fun main(
                address: Address,
                collectionPublicPath: PublicPath,
                itemID: UInt64
            ): AnyStruct {
            let account = getAccount(address)
            let capability = account.getCapability(collectionPublicPath)
            let publicCollection = capability.borrow<&{NonFungibleToken.CollectionPublic}>()!
            let nft = publicCollection.borrowNFT(id: itemID)
            let rpg = nft[FlowRPG.RPGCharacter]!
            return rpg.resolveView(
                Type<FlowRPG.RPGCharacterView>()
            )
        }
    `;
    const args = (arg, t) => [
        arg(address, t.Address),
        arg({ domain: 'public', identifier: collectionPublicPath }, t.Path),
        arg(itemID, t.UInt64),
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
