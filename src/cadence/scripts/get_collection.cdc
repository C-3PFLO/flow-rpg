import FlowRPG from "../contracts/FlowRPG.cdc"

pub fun main(address: Address): String {
    let capability: Capability<&FlowRPG.TempNFT> =
        getAccount(address)
        .getCapability<&FlowRPG.TempNFT>(FlowRPG.FlowRPGPublicPath)
    let nft: &FlowRPG.TempNFT = capability.borrow()!
    return nft.name;
}
