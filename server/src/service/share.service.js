class ShareService {
    // Trả về false nếu thiếu trường dữ liệu
    // Trả về đối tượng nếu đẩy đủ dữ liệu
    static parseBodyToObject(object, body) {
        try {
            for (let [key, value] of Object.entries(object)) {
                if (body[key] == undefined)
                    return false
                else
                    object[key] = body[key]
            }
            return object
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
module.exports = ShareService