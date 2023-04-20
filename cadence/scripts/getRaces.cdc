import RpgTemplates from "../contracts/RpgTemplates.cdc"

pub fun main(): {String: RpgTemplates.Race} {
    return RpgTemplates.getRaces()
}
