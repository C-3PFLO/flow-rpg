import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
    safeSendTransaction,
} from '../../common';

describe('cadence/scripts/get-all-nfts', () => {
    it('nominal', async () => {
        const admin = await getAccountAddress('admin');
        const user1 = await getAccountAddress('user1');
        // populate first collection
        await safeSendTransaction({
            name: 'init_example_collection',
            args: [],
            signers: [user1],
        });
        await safeSendTransaction({
            name: 'mint_example',
            args: [user1, 'my-new-nft', 'http://url-to-somewhere/my-new-nft.png'],
            signers: [admin],
        });
        await safeSendTransaction({
            name: 'mint_example',
            args: [user1, 'my-other-nft', 'http://url-to-somewhere/my-other-nft.png'],
            signers: [admin],
        });
        // populate another collection
        await safeSendTransaction({
            name: 'init_other_collection',
            args: [],
            signers: [user1],
        });
        // run and validate
        const [result] = await safeExecuteScript({
            name: 'get_all_nfts',
            args: [user1],
        });
        expect(result).toEqual([
            {
                nfts: [
                    {
                        uuid: '35',
                        id: '35',
                        name: 'my-other-nft',
                        imageURL: 'http://url-to-somewhere/my-other-nft.png',
                    },
                    {
                        uuid: '34',
                        id: '34',
                        name: 'my-new-nft',
                        imageURL: 'http://url-to-somewhere/my-new-nft.png',
                    },
                ],
                path: {
                    domain: 'storage',
                    identifier: 'myExampleNFTCollectionV1',
                },
            },
            {
                path: {
                    domain: 'storage',
                    identifier: 'myOtherExampleNFTCollectionV1',
                },
                nfts: [],
            },
        ]);
    });
    it('no collections', async () => {
        const user1 = await getAccountAddress('user1');
        // run and validate
        const [result] = await safeExecuteScript({
            name: 'get_all_nfts',
            args: [user1],
        });
        expect(result).toEqual([]);
    });
});
