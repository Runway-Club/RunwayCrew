const app = require('express');
const userSchema = require('../../schemas/user.schema');
const achiSchema = require('../../schemas/achievement.schema');
const atcSchema = require('../../schemas/atc.schema');
const contriSchema = require('../../schemas/contribute.schema');
const profileSchema = require('../../schemas/profile.schema');
const roleSchema = require('../../schemas/role.schema');
const skillSchema = require('../../schemas/skill.schema');
let mongoose = require('mongoose');
const router = app.Router();
const ATCModel = require('../../model/atc.model')
const shareService = require('../service/share.service');

const userDB = mongoose.model('users', userSchema);

//getall user
router.get("/", async (req, res) => {
    try {
        res.status(200).send(await userDB.find())
    } catch (error) {
        console.log(error)
        return res.status(500).send({ mess: "Server err" })
    }
})

//create user
router.post("/", async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new ATCModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newUser = new userDB(data)
            await newUser.save().then(savedDoc => {
                if (savedDoc === newUser)
                    return res.status(201).send({ mess: `User [${savedDoc._id}] is created` })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
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