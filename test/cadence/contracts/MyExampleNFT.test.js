import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
    safeSendTransaction,
} from '../../common';

describe('cadence/contracts/MyExampleNFT', () => {
    let admin;
    let user1;
    beforeEach(async () => {
        admin = await getAccountAddress('admin');
        user1 = await getAccountAddress('user1');
    });
    it('nominal', async () => {
        await safeSendTransaction({
            name: 'init_example_collection',
            args: [],
            signers: [user1],
        });
        await safeSendTransaction({
            name: 'mint_example',
            args: [user1, 'my-new-nft', 'my-url'],
            signers: [admin],
        });
        await safeSendTransaction({
            name: 'mint_example',
            args: [user1, 'another-nft', 'my-url-2'],
            signers: [admin],
        });
        const [ids] = await safeExecuteScript({
            name: 'get_ids',
            args: [user1],
        });
        expect(ids.length).toEqual(2);
        const [nft] = await safeExecuteScript({
            name: 'get_nft',
            args: [user1, ids[1]],
        });
        expect(nft).toEqual({
            name: 'another-nft',
            description: '',
            thumbnail: {
                url: 'my-url-2',
            },
        });
    });
});
