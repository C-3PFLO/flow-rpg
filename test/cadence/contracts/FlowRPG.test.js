import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
    safeSendTransaction,
} from '../../common';

describe('cadence/contracts/FlowRPG', () => {
    let admin;
    let user1;
    beforeEach(async () => {
        admin = await getAccountAddress('admin');
        user1 = await getAccountAddress('user1');
    });
    it('nominal', async () => {
        // init collection for user1
        await safeSendTransaction({
            name: 'init_example_collection',
            args: [],
            signers: [user1],
        });
        // mint nft as admin, deposit to user1
        await safeSendTransaction({
            name: 'mint_example',
            args: [user1, 'my-new-nft', '3'],
            signers: [admin],
        });
        // get handle on newly created nft
        let [result] = await safeExecuteScript({
            name: 'get_ids',
            args: [user1],
        });
        // attach rpg character to it and inspect result
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: ['/storage/myExampleNFTCollectionV1', '/public/myExampleNFTCollectionV1', result[0], 'this is the start of something big...'],
            signers: [user1],
        });
        [result] = await safeExecuteScript({
            name: 'get_background',
            args: [user1, '/public/myExampleNFTCollectionV1', result[0]],
        });
        expect(result).toEqual('this is the start of something big...');
    });
});
