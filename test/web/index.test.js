import { sayHello } from '../../src/web/index.js';

describe('index', () => {
    it('sayHello', () => {
        expect(sayHello()).toEqual('Hello from the web!');
    });
});
