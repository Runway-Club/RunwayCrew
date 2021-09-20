const app = require('express');
const userSchema = require('../../schemas/user.schema');
let mongoose = require('mongoose');
const router = app.Router();
const ATC = require('../../model/atc.model')
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
        let atc = new ATC()
        atc = shareService.parseBodyToObject(atc, req.body)
        if (!atc) {
            return res.status(400).send({ mess: 'Bad reques. Field is missing. Please check your atc data.' })
        }
        else {
            let newUser = new userDB(atc)
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
        await userDB.remove()
        return res.status(200).send({mess:"Remove all documents of USER"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({mess:"Server error"})
    }
})

module.exports = router;