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
    let nftID;
    beforeEach(async () => {
        admin = await getAccountAddress('admin');
        user1 = await getAccountAddress('user1');
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
        const [result] = await safeExecuteScript({
            name: 'get_ids',
            args: [user1],
        });
        nftID = result[0];
    });
    it('nominal', async () => {
        // attach rpg character to it and inspect result
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: [
                '/storage/myExampleNFTCollectionV1',
                '/public/myExampleNFTCollectionV1',
                nftID,
                'c-3pflo',
                '8',
                '11',
                '8',
                '20',
                '17',
                '15',
            ],
            signers: [user1],
        });
        const [result] = await safeExecuteScript({
            name: 'get_rpg_character',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(result).toEqual({
            strength: '8',
            dexterity: '11',
            constitution: '8',
            intelligence: '20',
            wisdom: '17',
            charisma: '15',
        });
    });
});
