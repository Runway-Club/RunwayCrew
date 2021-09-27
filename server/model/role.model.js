class RoleModel {
    constructor() {
        this.description = ''
        this.id = ''
        this.image = ''
        this.metadata = { actor: '', created: 0, updated: 0 }
        this.name = ''
        this._id = ''
    }

    /**
     * 
     * @param {any} body 
     * @param {bool} has_id 
     * @returns {RoleModel}
     */
     static anyToRole(body, has_id) {
        let newRole = new RoleModel()
        if (!has_id) {
            delete newRole._id
        }
        for (let [key, value] of Object.entries(newRole)) {
            if (body[key] != undefined) {
                newRole[key] = body[key]
            }
        }
        return newRole
    }
}
module.exports = RoleModel