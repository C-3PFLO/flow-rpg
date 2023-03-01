import FlowRPG from "../contracts/FlowRPG.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"

// this transaction attaches a FlowRPG.RPGCharacter to any NonFungibleToken
// by retrieving the nft using a storage path and id pair to identify it
// within the users account
// 
// currently both the StoragePath and PublicPath are required arguments
// the StoragePath will always be required to retrieve the NFT from the
// target collections Provides
// 
// the StoragePath could also be used to deposit the NFT back into the
// collection after attaching the FlowRPG.RPGCharacter.  however, in
// attempt to reduce what is exposed outside of the prepare function
// a reference to the collection's public Receiver capability is stored
// instead.  if this proves to be an unecessary precaution, then the
// PublicPath could be dropped as an argument.
// 
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
        // store the public path receiver to later deposit the nft back after attaching
        // assert if that capability is invalid, to fail befoew withdrawing and attaching
        // 
        self.receiverCapability = acct.getCapability<&AnyResource{NonFungibleToken.Receiver}>(collectionPublicPath)
        assert (
            self.receiverCapability.check(),
            message: "Could not access Receiver Capability at the given path for this account!"
        )
        // get the nft from storage path provider, but then only onld on to that one nft
        // to limit what is exposed in the execute phase
        //
        let providerReference =
            acct.borrow<&{NonFungibleToken.Provider}>(
                from: collectionStoragePath
            )!
        self.nft <- providerReference.withdraw(withdrawID: itemID)
    }

    execute {
        // TODO: pass a struct as an argument instead of individual values
        // that need to be reconstructed into a struct here
        let attributes = FlowRPG.AttributePoints(
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
        )
        // delegate to FlowRPG.attachRPGCharacter to create the
        // FlowRPG.RPGCharacter and attach it to the nft
        let rpgNFT <- FlowRPG.attachRPGCharacter(
            nft: <- self.nft,
            name: name,
            alignment: alignment,
            classID: classID,
            attributes: attributes
        ) as! @NonFungibleToken.NFT
        // deposit the modified nft back into the target collection
        // using the cached public Receiver capability
        self.receiverCapability
            .borrow()!
            .deposit(token: <- rpgNFT)
    }
}
 