# flow-rpg

Use `attachment RPGCharacter for NonFungibleToken` to RPG your NFT &trade;

Compatible with any `NonFungibleToken`, because composibility in web3 should be about "building bridges, not islands".

https://youtu.be/VGoSZAaWA74

## About

The primary contract is `/cadence/contracts/FlowRPG.cdc`, which defines the `attachment RPGCharacter for NonFungibleToken.INFT`.

The test cases in `test/cadence/contracts/FlowRPG.test.js` illustrate how this can be used, including `cadence/transactions/attach_rpg_character.cdc` to create a `FlowRPG.RPGCharacter` and attach it to any `NonFungibleToken`.

The front-end uses `@onflow/fcl` to read and write blockchain data, with scripts and transactions implemented in `src/fcl`.

## Testing

To run this project, clone the repository and use

```sh
# install required node_modules
npm install
# start flow emulator, flow dev, flow dev-wallet and webpack serve
npm run start
# run flow transactions to initialize test accounts with data
npm run hydrate
```

Then open your browser to `http://localhost:8081/`.

*NOTE: since the `attachment` feature is only available in `v0.45.1-cadence-attachments-3`, you must test with an emulator from this build (see: https://forum.onflow.org/t/attachments-and-authaccount-capabilities-preview-release/4239 for more information).*

---

*The cadence implementation to [fetchAllCollections using forEachStored](https://github.com/C-3PFLO/flow-rpg/blob/1fa45aeac92b078ab33b321673f42067281962c4/src/fcl/collections.js#L10) is heavily based on a community provided script.*

*This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.*
