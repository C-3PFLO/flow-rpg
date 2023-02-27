import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"

pub contract MyExampleNFT: NonFungibleToken {

    pub var totalSupply: UInt64
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        pub let id: UInt64
        pub let name: String
        pub let imageURL: String

        pub fun getViews() : [Type] {
            var views: [Type]=[]
            views.append(Type<MetadataViews.Display>())
            return views
        }

        pub fun resolveView(_ type: Type): AnyStruct? {
            if type == Type<MetadataViews.Display>() {
                return MetadataViews.Display(
                    name: self.name,
                    description: "",
                    thumbnail: MetadataViews.HTTPFile(
                        url: self.imageURL
                    )
                )
            }
            return nil
        }

        init(_name: String, _imageURL: String) {
            self.id = self.uuid
            self.name = _name
            self.imageURL = _imageURL
        }
    }

    pub resource interface CollectionPublic {
        pub fun getIDs(): [UInt64]
        pub fun borrowAuthNFT(id: UInt64): &NFT
    }

    pub resource Collection: NonFungibleToken.Provider,
                             NonFungibleToken.Receiver,
                             NonFungibleToken.CollectionPublic,
                             CollectionPublic {

        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let nft <- self.ownedNFTs.remove(key: withdrawID)
            ?? panic("NFT does not exist in this collection.")
            emit Withdraw(id: nft.id, from: self.owner?.address)
            return <- nft
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let nft <- token as! @NFT
            emit Deposit(id: nft.id, to: self.owner?.address)
            self.ownedNFTs[nft.id] <-! nft
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowAuthNFT(id: UInt64): &NFT {
            let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            return ref as! &NFT
        }

        init() {
            self.ownedNFTs <- {}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    pub resource Minter {
        pub fun createNFT(name: String, imageURL: String): @NFT {
            return <- create NFT(
                _name: name,
                _imageURL: imageURL
            )
        }
        pub fun createMinter(): @Minter {
            return <- create Minter()
        }
    }

    init() {
        self.totalSupply = 0
        self.CollectionStoragePath = /storage/myExampleNFTCollectionV1
        self.CollectionPublicPath = /public/myExampleNFTCollectionV1
        self.MinterStoragePath = /storage/myExampleNFTMinterV1

        self.account.save(<- create Minter(), to: self.MinterStoragePath)
        emit ContractInitialized()
    }
}