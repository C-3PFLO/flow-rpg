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
    let rpgArgs;

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
            args: [user1, 'my-new-nft', 'http://url-to-somewhere/my-new-nft.png'],
            signers: [admin],
        });
        // get handle on newly created nft
        const [result] = await safeExecuteScript({
            name: 'get_ids',
            args: [user1],
        });
        // cache inputs for tests
        nftID = result[0];
        rpgArgs = [
            '/storage/myExampleNFTCollectionV1',
            '/public/myExampleNFTCollectionV1',
            nftID,
            'c-3pflo',
            'good-lawful',
            'sorcerer-v1',
            '8', '11', '8', '15', '15', '12',
        ];
    });
    it('nominal', async () => {
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: rpgArgs,
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
        const [display] = await safeExecuteScript({
            name: 'get_rpg_character_display',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(display).toEqual({
            name: 'c-3pflo',
            description: '... to do ...',
            thumbnail: {
                // TODO
                // url: 'http://url-to-somewhere/my-new-nft.png',
                url: '',
            },
        });
    });
    it('setName', async () => {
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: rpgArgs,
            signers: [user1],
        });
        await safeSendTransaction({
            name: 'set_name',
            args: [
                '/storage/myExampleNFTCollectionV1',
                nftID,
                'R2D2',
            ],
            signers: [user1],
        });
        const [result] = await safeExecuteScript({
            name: 'get_rpg_character',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(result.name).toEqual('R2D2');
    });
    it('updateHitPoints', async () => {
        await safeSendTransaction({
            name: 'attach_rpg_character',
            args: rpgArgs,
            signers: [user1],
        });
        await safeSendTransaction({
            name: 'update_hitpoints',
            args: [
                user1,
                '/public/myExampleNFTCollectionV1',
                nftID,
                '-2',
            ],
            signers: [admin],
        });
        const [result] = await safeExecuteScript({
            name: 'get_rpg_character',
            args: [user1, '/public/myExampleNFTCollectionV1', nftID],
        });
        expect(result.hitPoints).toEqual('4');
    });
    it('panics if attribute > 15', async () => {
        rpgArgs[9] = '16';
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: rpgArgs,
                signers: [user1],
            }),
        );
        expect(error).toContain('exceeds maximum initial value');
    });
    it('panics if attribute < 8', async () => {
        rpgArgs[6] = '7';
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: rpgArgs,
                signers: [user1],
            }),
        );
        expect(error).toContain('less than minimum initial value');
    });
    it('panics if total points > 27', async () => {
        rpgArgs[7] = '15';
        rpgArgs[11] = '15';
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: rpgArgs,
                signers: [user1],
            }),
        );
        expect(error).toContain('exceeds maximum total points');
    });
    it('panics if classID not valid', async () => {
        rpgArgs[5] = 'not-a-class';
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'attach_rpg_character',
                args: rpgArgs,
                signers: [user1],
            }),
        );
        expect(error).toContain('classID does not exist');
    });
    it('panics on updateHitPoints', async () => {
        const [, error] = await shallRevert(
            sendTransaction({
                name: 'user_update_hitpoints_panics',
                args: [
                    '/storage/myExampleNFTCollectionV1',
                    nftID,
                    '-4',
                ],
                signers: [user1],
            }),
        );
        expect(error).toContain('function has contract access');
    });
});
