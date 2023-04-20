import RpgTemplates from "../contracts/RpgTemplates.cdc"

transaction() {

    var admin: &RpgTemplates.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&RpgTemplates.Admin>(
            from: RpgTemplates.ADMIN_PATH
        )!
    }

    execute {
        let race: RpgTemplates.Race = RpgTemplates.Race(
            index: "half-elf",
            name: "Half-Elf",
            speed: 30,
            ability_bonuses: [
                RpgTemplates.AbilityBonus(
                    bonus: 2,
                    ability_score: "cha"
                )
            ],
            ability_bonus_options: RpgTemplates.OptionSet(
                desc: "",
                choose: 2,
                type: "ability_bonuses",
                from: []
            ),
            alignment: "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others' demands, and sometimes prove unreliable, or at least unpredictable.",
            age: "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.",
            size: "Medium",
            size_description: "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
            starting_proficiencies: [],
            starting_proficiency_options: RpgTemplates.OptionSet(
                desc: "",
                choose: 2,
                type: "proficiencies",
                from: []
            ),
            languages: [
                "common",
                "elvish"
            ],
            starting_language_options: RpgTemplates.OptionSet(
                desc: "",
                choose: 1,
                type: "languages",
                from: []
            ),
            language_desc: "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
            traits: [
                "darkvision",
                "fey-ancestry",
                "skill-versatility"
            ],
            subraces: []
        )
        self.admin.addRace(race: race)
    }
}
