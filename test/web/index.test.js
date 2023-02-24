import { sayHello } from '../../src/index.js';

xdescribe('index', () => {
    it('sayHello', () => {
        expect(sayHello()).toEqual('Hello from the web!');
    });
});
