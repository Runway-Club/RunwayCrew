class ATCModel {
    constructor() {
        this.address = ''
        this.contribMetadata = { created: 0, actor: '', updated: 0 }
        this.dob = ''
        this.email = ''
        this.facebook = ''
        this.gender = ''
        this.linkIn = ''
        this.name = ''
        this.phoneNumber = ''
        this.photoUrl = ''
        this.profileMetadata = { updated: 0 }
        this.roles = []
        this.selectedRoles = []
        this.uid = ''
        this.id = ''
        this._id = ''
        this.styleUserRead = ''
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {ATCModel}
     */
    static anyToATC(body, has_id) {
        let newATC = new ATCModel()
        if (!has_id) {
            delete newATC._id
        }
        for (let [key, value] of Object.entries(newATC)) {
            if (body[key] != undefined) {
                newATC[key] = body[key]
            }
        }
        return newATC
    }
}
module.exports = ATCModel