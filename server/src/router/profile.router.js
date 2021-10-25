const app = require('express');
const profilesSchema = require('../../schemas/profile.schema')


let mongoose = require('mongoose');
const router = app.Router();

const ProfileDB = mongoose.model('profiles', profilesSchema)

const ProfileModel = require('../../model/profile.model')
const shareService = require('../service/share.service');

router.get("/", async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            ProfileDB.findById(id, (err, doc) => {
                if (err) {
                    return res.status(404).send({ mess: `ID [${id}] not found` })
                }
                else {
                    return res.status(200).send(doc)
                }
            })
        }
        else {
            return res.status(200).send(await ProfileDB.find())
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.get('/community', async (req, res)=>{
    try {
        let {size, roleId, last} = req.query;
        if(roleId === 'undefined'){
            let response = await ProfileDB
                .find()
                .sort({"profileMetadata.updated": 1})
                .limit(size)
            return res.status(200).send(response)
        }else{
            let response = await ProfileDB
                .find({roles: roleId})
                .sort({"profileMetadata.updated": 1})
                .limit(size)
            return res.status(200).send(response)
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.get("/uid", async (req, res) => {
    try {
        const { uid } = req.query;
        if (uid) {
            ProfileDB.find({uid:uid}, (err, doc) => {
                if (err) {
                    return res.status(404).send({ mess: `ID [${id}] not found` })
                }
                else {
                    return res.status(200).send(doc)
                }
            })
        }
        else {
            return res.status(200).send(await ProfileDB.find())
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.post("/", async (req, res) => {
    try {
        let dataProfile = ProfileModel.anyToProfile(req.body, false)
        let newProfile = new ProfileDB(dataProfile)
        newProfile.save().then(savedDoc => {
            if (savedDoc === newProfile)
                return res.status(201).send({ mess: `Profile [${savedDoc._id}] is created` })
            else
                return res.status(500).send({ mess: 'Server err' })
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.put('/', async (req, res) => {
    try {
        let dataProfile = ProfileModel.anyToProfile(req.body, true)
        if (dataProfile._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            ProfileDB.findByIdAndUpdate(dataProfile._id, dataProfile, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `Profile [${dataProfile._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `profile [${dataProfile._id}] is updated !` });
                }
            })
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
})

router.delete("/", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(400).send({ mess: `[id] is empty` })
        }
        ProfileDB.findByIdAndDelete(id, function (err, docs) {
            if (err)
                res.status(404).send({ mess: `Profile [${id}] not found` })
            else
                res.status(200).send({ mess: `Profile [${id}] is deleted` })
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({ mess: 'Server err' })
    }
})
module.exports = router;