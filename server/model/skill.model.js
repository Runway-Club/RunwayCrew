
class SkillModel {
    constructor() {
        this.description = ''
        this.id = ''
        this.image = ''
        this.levels = []
        this.metadata = { actor: '', updated: 0, created: 0 }
        this.name = ''
        this._id = ''
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {SkillModel}
     */
    static anyToSkill(body, has_id) {
        let newSkill = new SkillModel()
        if (!has_id) {
            delete newSkill._id
        }
        for (let [key, value] of Object.entries(newSkill)) {
            if (body[key] != undefined) {
                newSkill[key] = body[key]
            }
        }
        return newSkill
    }
}
module.exports = SkillModel