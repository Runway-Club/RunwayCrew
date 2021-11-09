const admin = require('firebase-admin');

class ShareService {

    // Dùng {err,data} để nhận dữ liệu
    // err null => không lỗi, và có thể sử dụng data
    // err khác null => bị lỗi do thiếu trường 
    static parseBodyToObject(object, body) {
        try {
            let err = ''
            let hasNullFil = false
            for (let [key, value] of Object.entries(object)) {


                if (body[key] == undefined) {
                    if (key == 'achievements') {
                        object[key] = []
                    }
                    else {
                        hasNullFil = true
                        err += `${key.toString()},`
                    }
                }
                else
                    object[key] = body[key]
            }
            if (hasNullFil) {
                return { err: err, data: null }
            }
            else {
                return { err: null, data: object }
            }
        } catch (error) {
            console.log(error)
            return { err: '..', data: null }
        }
    }

    /**
     * 
     * @param {String} req 
     * @returns {admin.auth.DecodedIdToken}
     */
    static async getUserOfToken(req) {
        const idToken = req.header('Authorization')
        try {
            if (!idToken) {
                return null;
            }
            let user = await admin.auth().verifyIdToken(idToken)
            return user
        } catch (err) {
            return null;
        }
    }
}
module.exports = ShareService