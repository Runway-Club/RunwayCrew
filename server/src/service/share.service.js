class ShareService {

    // Dùng {err,data} để nhận dữ liệu
    // err null => không lỗi, và có thể sử dụng data
    // err khác null => bị lỗi do thiếu trường 
    static parseBodyToObject(object, body) {
        try {
            let err = ''
            let hasNullFil = false
            // if (object['_id'] != undefined) {
            //     delete object['_id']
            // }
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
}
module.exports = ShareService