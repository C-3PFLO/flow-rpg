import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
    safeSendTransaction,
} from '../../common';

describe('cadence/contracts/FlowRPG', () => {
    let admin;
    beforeEach(async () => {
        admin = await getAccountAddress('admin');
    });
    it('nominal', async () => {
        await safeSendTransaction({
            name: 'attach',
            args: ['my-nft'],
            signers: [admin],
        });
        const [result] = await safeExecuteScript({
            name: 'get_collection',
            args: [admin],
        });
        expect(result).toEqual('my-nft');
    });
});
