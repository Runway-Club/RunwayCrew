const app = require('express');
let mongoose = require('mongoose');

const achiSchema = require('../../schemas/achievement.schema');
const atcSchema = require('../../schemas/atc.schema');
const contriSchema = require('../../schemas/contribute.schema');
const profileSchema = require('../../schemas/profile.schema');
const roleSchema = require('../../schemas/role.schema');
const skillSchema = require('../../schemas/skill.schema');

const ProfileDB = mongoose.model('profiles', profileSchema)
const router = app.Router();
const generateToken = require('../generate-token');

//create user
router.post("/login", async (req, res) => {
    try {
        let uid = req.body.uid ?? '';
        if (uid != '') {
            ProfileDB.findOne({ uid: uid }, (err, doc) => {
                if (err || doc == null) {
                    return res.status(401).send({ mess: `Login failed` })
                }
                else {
                    generateToken(res, doc._id, uid);
                    res.status(200).send({ mess: "Login successfully" });
                }
            })
        }
        else {
            return res.status(401).send({ mess: "Login failed, miss uid in body" })
        }
    }
    catch (err) {
        res.status(401).send(err);
    }
});

//xóa tất cả dữ liệu collection! hạn chế sử dụng
router.delete("/all", async (req, res) => {
    try {
        let { id } = req.query
        let db
        id == 'achievements' ?
            db = mongoose.model('achievements', achiSchema) : id == 'atcs' ?
                db = mongoose.model('atcs', atcSchema) : id == 'contributes' ?
                    db = mongoose.model('contributes', contriSchema) : id == 'profiles' ?
                        db = mongoose.model('profiles', profileSchema) : id == 'roles' ?
                            db = mongoose.model('roles', roleSchema) : id == 'skills' ?
                                db = mongoose.model('skills', skillSchema) : id == 'users' ?
                                    db = mongoose.model('users', userSchema) : db = null
        if (db != null) {
            await db.remove()
            return res.status(200).send({ mess: `Remove all documents of ${id}` })
        }
        else {
            return res.status(200).send({ mess: `Collection ${id} is not exist` })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ mess: "Server error" })
    }
})

module.exports = router;