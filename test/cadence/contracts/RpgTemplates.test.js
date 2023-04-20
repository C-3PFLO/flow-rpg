import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
    safeSendTransaction,
} from '../../common';

import racesExpected1 from './assets/races.expected.1';

describe('cadence/contracts/RpgTemplates', () => {
    let admin;

    beforeEach(async () => {
        admin = await getAccountAddress('admin');
    });
    it.only('Race', async () => {
        await safeSendTransaction({
            name: 'addRace',
            args: [],
            signers: [admin],
        });
        const [result] = await safeExecuteScript({
            name: 'getRaces',
            args: [],
        });
        expect(result).toEqual(racesExpected1);
    });
});
