class ContriModel {
    constructor() {
        this.achievements = []
        this.credit = 0
        this.email = ''
        this.exp = 0
        this.skills = []
        this.uid = ''
        this.id = ''
        this._id = ''
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {ContriModel}
     */
    static anyToContri(body, has_id) {
        let newContri = new ContriModel()
        if (!has_id) {
            delete newContri._id
        }
        for (let [key, value] of Object.entries(newContri)) {
            if (body[key] != undefined) {
                newContri[key] = body[key]
            }
        }
        return newContri
    }
}
module.exports = ContriModel