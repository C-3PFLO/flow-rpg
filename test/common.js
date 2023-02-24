import {
    deployContractByName,
    executeScript,
    sendTransaction,
} from '@onflow/flow-js-testing';

export const safeDeployContractByName = async (...props) => {
    const [result, error] = await deployContractByName(...props);
    expect(error).toBeNull();
    return [result, error];
};

export const safeExecuteScript = async (...props) => {
    const [result, error] = await executeScript(...props);
    expect(error).toBeNull();
    return [result, error];
};

export const safeSendTransaction = async (...props) => {
    const [result, error] = await sendTransaction(...props);
    expect(error).toBeNull();
    return [result, error];
};
