import FlowRPG from "../contracts/FlowRPG.cdc"

transaction(name: String) {
    prepare(account: AuthAccount) {
        let originalNFT <- FlowRPG.createTempNFT(
            name: name
        )
        account.save(
            <- originalNFT,
            to: FlowRPG.FlowRPGStoragePath
        )
        account.link<&FlowRPG.TempNFT>(
            FlowRPG.FlowRPGPublicPath,
            target: FlowRPG.FlowRPGStoragePath
        )
    }
}