class AchiModel {
    constructor() {
        this.credit = 0
        this.description = ''
        this.exp = 0
        this.image = ''
        this.metadata = { created: 0, actor: '', updated: 0 }
        this.name = ''
        this.skills = []
        this.id = ''
        this._id = ''
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {AchiModel}
     */
    static anyToAchi(body, has_id) {
        let newAchi = new AchiModel()
        if (!has_id) {
            delete newAchi._id
        }
        for (let [key, value] of Object.entries(newAchi)) {
            if (body[key] != undefined) {
                newAchi[key] = body[key]
            }
        }
        return newAchi
    }
}
module.exports = AchiModel