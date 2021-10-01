
class ProfileModel {
    constructor() {
        this.address = ''
        this.contribMetadata = { updated: 0, actor: '', created: 0 }
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
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {ProfileModel}
     */
     static anyToProfile(body, has_id) {
        let newProfile = new ProfileModel()
        if (!has_id) {
            delete newProfile._id
        }
        for (let [key, value] of Object.entries(newProfile)) {
            if (body[key] != undefined) {
                newProfile[key] = body[key]
            }
        }
        return newProfile
    }
}
module.exports = ProfileModel