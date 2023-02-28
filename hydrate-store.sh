#!/bin/sh

flow transactions send ./cadence/transactions/init_example_collection.cdc --signer emulator-account
flow transactions send ./cadence/transactions/init_other_collection.cdc --signer emulator-account

flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 gooberz-2887 https://partymansion.mypinata.cloud/ipfs/QmZVPvFH5wqDqN8hcELN6hLNXePA1s336hPPUBizdUotcE
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 flovatar-629 https://flovatar.com/api/image/629
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 flovatar-6073 https://flovatar.com/api/image/6073
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 flovatar-5957 https://flovatar.com/api/image/5957
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 flovatar-5662 https://flovatar.com/api/image/5662
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 piggo-7802 https://ik.imagekit.io/xyvsisxky/tr:w-600/https://s3.us-west-2.amazonaws.com/crypto-piggo.nft/piggo-7802.png
flow transactions send ./cadence/transactions/mint_example.cdc --signer default f8d6e0586b0a20c7 flovatar-2861 https://flovatar.com/api/image/2861
