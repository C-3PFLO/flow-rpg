// This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

// This contract implements the SRD schema and hosts the SRD content as
// provided here: http://www.dnd5eapi.co/
//
// Notable simplifications:
// - url parameter dropped from all objects, no longer relevant
// - OptionSet from parameter simplified as [AnyStruct]

pub contract RpgTemplates {

    // constants
    // ===========================================

    pub let STORAGE_PATH: StoragePath
    pub let PUBLIC_PATH: PublicPath
    pub let ADMIN_PATH: StoragePath

    // structs
    // ===========================================

    pub struct OptionSet {
        pub let desc: String
        pub let choose: Int8
        pub let type: String
        pub let from: [AnyStruct] // NOTE: simplifying as an AnyStruct
        init(
            desc: String,
            choose: Int8,
            type: String,
            from: [AnyStruct]
        ) {
            self.desc = desc
            self.choose = choose
            self.type = type
            self.from = from
        }
    }

    pub struct AbilityBonus {
        pub let bonus: UInt8
        pub let ability_score: String
        init(
            bonus: UInt8,
            ability_score: String
        ) {
            self.bonus = bonus
            self.ability_score = ability_score
        }
    }

    pub struct Race {
        pub let index: String
        pub let name: String
        pub let speed: UInt8
        pub let ability_bonuses: [AbilityBonus]
        pub let ability_bonus_options: OptionSet
        pub let alignment: String
        pub let age: String
        pub let size: String
        pub let size_description: String
        pub let starting_proficiencies: [String]
        pub let starting_proficiency_options: OptionSet
        pub let languages: [String]
        pub let starting_language_options: OptionSet
        pub let language_desc: String
        pub let traits: [String]
        pub let subraces: [String]
        init(
            index: String,
            name: String,
            speed: UInt8,
            ability_bonuses: [AbilityBonus],
            ability_bonus_options: OptionSet,
            alignment: String,
            age: String,
            size: String,
            size_description: String,
            starting_proficiencies: [String],
            starting_proficiency_options: OptionSet,
            languages: [String],
            starting_language_options: OptionSet,
            language_desc: String,
            traits: [String],
            subraces: [String]
        ) {
            self.index = index
            self.name = name
            self.speed = speed
            self.ability_bonuses = ability_bonuses
            self.ability_bonus_options = ability_bonus_options
            self.alignment = alignment
            self.age = age
            self.size = size
            self.size_description = size_description
            self.starting_proficiencies = starting_proficiencies
            self.starting_proficiency_options = starting_proficiency_options
            self.languages = languages
            self.starting_language_options = starting_language_options
            self.language_desc = language_desc
            self.traits = traits
            self.subraces = subraces
        }
    }

    // variables
    // ===========================================

    pub var total: UInt64
    pub var races: {String: Race}

    // admin
    // ===========================================

    pub resource Admin {
        // template methods
        pub fun addRace(race: Race) {
            pre {
                RpgTemplates.races[race.index] == nil : "index exists"
            }
            RpgTemplates.races[race.index] = race
        }

        // other methods
        pub fun createAdmin(): @Admin {
            return <- create Admin()
        }
    }

    // public methods
    // ===========================================

    pub fun getRaces(): {String: Race} {
        return self.races
    }

    // init
    // ===========================================

    init() {
        // constants
        self.STORAGE_PATH = /storage/rpgRace_v1
        self.PUBLIC_PATH = /public/rpgRace_v1
        self.ADMIN_PATH = /storage/rpgRace_admin_v1
        // variables
        self.total = 0
        self.races = {}
        // resources
        self.account.save(<- create Admin(), to: self.ADMIN_PATH)
    }
}
