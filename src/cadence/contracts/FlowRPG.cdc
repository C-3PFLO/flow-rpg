pub contract FlowRPG {

    pub let FlowRPGStoragePath: StoragePath
    pub let FlowRPGPublicPath: PublicPath

    init() {
        self.FlowRPGStoragePath = /storage/FlowRPGStoragePath
        self.FlowRPGPublicPath = /public/FlowRPGPublicPath
    }

    pub resource TempNFT {
        pub let id: UInt64
        pub let name: String
        init(_name: String) {
            self.id = self.uuid
            self.name = _name
        }
    }

    pub fun createTempNFT(name: String): @TempNFT {
        return <- create TempNFT(_name: name);
    }

    // pub attachment RPGCharacter for TempNFT {
    //     pub let story: String
    //     init(_story: String) {
    //         self.story = _story
    //     }
    // }

}
