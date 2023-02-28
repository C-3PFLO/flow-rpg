/* eslint-disable max-len */
import * as fcl from '@onflow/fcl';

/**
* @public
* @param {String} collectionStoragePath
* @param {String} collectionPublicPath
* @param {Integer} itemID
* @param {String} name
* @param {String} alignment
* @param {String} classID
* @param {Integer} strength
* @param {Integer} dexterity
* @param {Integer} constitution
* @param {Integer} intelligence
* @param {Integer} wisdom
* @param {Integer} charisma
* @return {Promise}
*/
export function attachRPGCharacter(
    collectionStoragePath,
    collectionPublicPath,
    itemID,
    name,
    alignment,
    classID,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma ) {
    const cadence = `
        import FlowRPG from 0xAdmin
        import NonFungibleToken from 0xAdmin
        
        transaction(
            collectionStoragePath: StoragePath,
            collectionPublicPath: PublicPath,
            itemID: UInt64,
            name: String,
            alignment: String,
            classID: String,
            strength: UInt64,
            dexterity: UInt64,
            constitution: UInt64,
            intelligence: UInt64,
            wisdom: UInt64,
            charisma: UInt64
        ) {
        
            let receiverCapability: Capability<&{NonFungibleToken.Receiver}>
            var nft: @{NonFungibleToken.INFT}
        
            prepare(acct: AuthAccount) {
                // store retriever to deposit nft after attachment
                self.receiverCapability = acct.getCapability<&AnyResource{NonFungibleToken.Receiver}>(collectionPublicPath)
                assert (
                    self.receiverCapability.check(),
                    message: "Could not access Receiver Capability at the given path for this account!"
                )
                // get nft from provider
                let providerReference =
                    acct.borrow<&{NonFungibleToken.Provider}>(
                        from: collectionStoragePath
                    )!
                self.nft <- providerReference.withdraw(withdrawID: itemID)
            }
        
            execute {
                let attributes = FlowRPG.AttributePoints(
                    strength: strength,
                    dexterity: dexterity,
                    constitution: constitution,
                    intelligence: intelligence,
                    wisdom: wisdom,
                    charisma: charisma,
                )
                let rpgNFT <- FlowRPG.attachRPGCharacter(
                    nft: <- self.nft,
                    name: name,
                    alignment: alignment,
                    classID: classID,
                    attributes: attributes
                ) as! @NonFungibleToken.NFT
                self.receiverCapability
                    .borrow()!
                    .deposit(token: <- rpgNFT)
            }
        }
    `;
    const args = (arg, t) => [
        arg({ domain: 'storage', identifier: collectionStoragePath }, t.Path),
        arg({ domain: 'public', identifier: collectionPublicPath }, t.Path),
        arg(itemID, t.UInt64),
        arg(name, t.String),
        arg(alignment, t.String),
        arg(classID, t.String),
        arg(strength, t.UInt64),
        arg(dexterity, t.UInt64),
        arg(constitution, t.UInt64),
        arg(intelligence, t.UInt64),
        arg(wisdom, t.UInt64),
        arg(charisma, t.UInt64),
    ];
    return fcl.mutate({ cadence, args }).then((id) => {
        return fcl.tx(id).onceSealed();
    });
}

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
