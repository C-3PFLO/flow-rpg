import {
    getAccountAddress,
} from '@onflow/flow-js-testing';

import {
    safeExecuteScript,
} from '../../common';

describe('cadence/contracts/FlowRPG', () => {
    let admin;
    beforeEach(async () => {
        admin = await getAccountAddress('admin');
    });
    it('sayHello', async () => {
        const code = `
            import FlowRPG from ${admin}
            pub fun main(): String {
                return FlowRPG.sayHello()
            }
        `;
        const [result] = await safeExecuteScript({ code });
        expect(result).toEqual('Hello world!');
    });
});
