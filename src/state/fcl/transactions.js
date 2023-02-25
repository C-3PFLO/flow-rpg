/* eslint-disable max-len */
import * as fcl from '@onflow/fcl';

/**
* @public
* @return {Promise}
*/
export function initCollection() {
    const cadence = `
        import MyExampleNFT from 0xAdmin
        import NonFungibleToken from 0xAdmin
        
        transaction() {
            prepare(signer: AuthAccount) {
                signer.save(
                    <- MyExampleNFT.createEmptyCollection(),
                    to: MyExampleNFT.CollectionStoragePath
                )
                signer.link<&MyExampleNFT.Collection{NonFungibleToken.CollectionPublic,
                                                    NonFungibleToken.Receiver,
                                                    MyExampleNFT.CollectionPublic}>(
                    MyExampleNFT.CollectionPublicPath,
                    target: MyExampleNFT.CollectionStoragePath
                )
            }
        }
    `;
    return fcl.mutate({ cadence }).then((id) => {
        return fcl.tx(id).onceSealed();
    });
}
