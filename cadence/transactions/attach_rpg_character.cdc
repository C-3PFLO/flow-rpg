import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

transaction(
    collectionStoragePath: StoragePath,
    collectionPublicPath: PublicPath,
    itemID: UInt64,
    name: String,
    alignment: String,
    classID: String,
    strength: UInt64,
    dexterity: UInt64,
    constitution: UInt64,
    intelligence: UInt64,
    wisdom: UInt64,
    charisma: UInt64
) {

    let receiverCapability: Capability<&{NonFungibleToken.Receiver}>
    var nft: @{NonFungibleToken.INFT}

    prepare(acct: AuthAccount) {
        // store retriever to deposit nft after attachment
        self.receiverCapability = acct.getCapability<&AnyResource{NonFungibleToken.Receiver}>(collectionPublicPath)
        assert (
            self.receiverCapability.check(),
            message: "Could not access Receiver Capability at the given path for this account!"
        )
        // get nft from provider
        let providerReference =
            acct.borrow<&{NonFungibleToken.Provider}>(
                from: collectionStoragePath
            )!
        self.nft <- providerReference.withdraw(withdrawID: itemID)
    }

    execute {
        let attributes = FlowRPG.AttributePoints(
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
        )
        let rpgNFT <- FlowRPG.attachRPGCharacter(
            nft: <- self.nft,
            name: name,
            alignment: alignment,
            classID: classID,
            attributes: attributes
        ) as! @NonFungibleToken.NFT
        self.receiverCapability
            .borrow()!
            .deposit(token: <- rpgNFT)
    }
}
 