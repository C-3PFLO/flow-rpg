import {
    getAccountAddress,
    sendTransaction,
    shallRevert,
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
                '8', '11', '8', '15', '15', '12',
                'sorcerer-v1',
                'good-lawful',
            ],
            signers: [user1],
        });
        const [result] = await safeExecuteScript({
            name: 'get_rpg_character',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(result).toEqual({
            name: 'c-3pflo',
            alignment: 'good-lawful',
            classID: 'sorcerer-v1',
            class: {
                name: 'Sorcerer',
                description: '... to do ...',
                bonuses: [
                    { rawValue: '5' },
                    { rawValue: '3' },
                ],
                savingThrows: [
                    { rawValue: '5' },
                ],
                attackAbilities: [
                    { rawValue: '2' },
                ],
                initialHitPoints: '6',
            },
            attributes: {
                strength: '8',
                dexterity: '11',
                constitution: '8',
                intelligence: '15',
                wisdom: '15',
                charisma: '12',
            },
            hitPoints: '6',
        });
    });
    xit('setName', async () => {
        // attach rpg character to it and inspect result
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: [
                '/storage/myExampleNFTCollectionV1',
                '/public/myExampleNFTCollectionV1',
                nftID,
                'c-3pflo',
                '8', '11', '8', '15', '15', '12',
                'wizard-v1',
                'good-lawful',
            ],
            signers: [user1],
        });
        await safeSendTransaction({
            // TODO: write set_name
            name: 'set_name',
            args: [
                '/storage/myExampleNFTCollectionV1',
                '/public/myExampleNFTCollectionV1',
                nftID,
                'r2d2',
            ],
            signers: [user1],
        });
        const [result] = await safeExecuteScript({
            name: 'get_rpg_character',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(result.name).toEqual('r2d2');
    });
    it('panics if attribute > 15', async () => {
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: [
                    '/storage/myExampleNFTCollectionV1',
                    '/public/myExampleNFTCollectionV1',
                    nftID,
                    'c-3pflo',
                    '8', '11', '8', '20', '15', '12',
                    'wizard-v1',
                    'good-lawful',
                ],
                signers: [user1],
            }),
        );
        expect(error).toContain('exceeds maximum initial value');
    });
    it('panics if attribute < 8', async () => {
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: [
                    '/storage/myExampleNFTCollectionV1',
                    '/public/myExampleNFTCollectionV1',
                    nftID,
                    'c-3pflo',
                    '1', '11', '8', '15', '15', '12',
                    'wizard-v1',
                    'good-lawful',
                ],
                signers: [user1],
            }),
        );
        expect(error).toContain('less than minimum initial value');
    });
    it('panics if total points > 27', async () => {
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: [
                    '/storage/myExampleNFTCollectionV1',
                    '/public/myExampleNFTCollectionV1',
                    nftID,
                    'c-3pflo',
                    '8', '15', '8', '15', '15', '15',
                    'wizard-v1',
                    'good-lawful',
                ],
                signers: [user1],
            }),
        );
        expect(error).toContain('exceeds maximum total points');
    });
    it('panics if classID not valid', async () => {
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: [
                    '/storage/myExampleNFTCollectionV1',
                    '/public/myExampleNFTCollectionV1',
                    nftID,
                    'c-3pflo',
                    '8', '11', '8', '15', '15', '12',
                    'not-a-class',
                    'good-lawful',
                ],
                signers: [user1],
            }),
        );
        expect(error).toContain('classID does not exist');
    });
});
