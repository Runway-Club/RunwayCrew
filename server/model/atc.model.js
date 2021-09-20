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
    }
}
module.exports = ATCModel