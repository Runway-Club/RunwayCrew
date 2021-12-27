const app = require('express');
const profilesSchema = require('../../schemas/profile.schema')
const atcSchema = require('../../schemas/atc.schema')

let mongoose = require('mongoose');
const router = app.Router();

const ProfileDB = mongoose.model('profiles', profilesSchema)
const atcDB = mongoose.model('atc', atcSchema);

const ProfileModel = require('../../model/profile.model')
const shareService = require('../service/share.service');
const verifyToken = require('../verify-token');
const admin = require('firebase-admin');

router.get("/", async (req, res) => {
    //pageSize, pageCount, pageNum, role
    try {
        let pageSize = req.query.pageSize || 30
        let pageNum = req.query.pageNum || 0
        pageSize = pageSize - 0
        pageNum = pageNum - 0
        if(pageNum==-1){
            return res.status(200).send(await ProfileDB.find())
        }
        if (req.query.role == 'undefined') {
            await ProfileDB.find()
                .limit(pageSize - 0)
                .skip(pageSize * pageNum)
                .exec((err, datas) => {
                    ProfileDB.countDocuments((err, count) => {
                        if (err) return res.status(200).send({ mess: 'Server error' })
                        let pageCount = Math.ceil(count / pageSize) - 1
                        return res.status(200).send({
                            data: datas,
                            pageSize: pageSize,
                            pageNum: pageNum,
                            pageCount: pageCount,
                            totalItems: count
                        })
                    });
                });
        }
        else {
            await ProfileDB
                .find({roles: req.query.role})
                .limit(pageSize - 0)
                .skip(pageSize * pageNum)
                .exec((err, datas) => {
                    ProfileDB.countDocuments((err, count) => {
                        if (err) return res.status(200).send({ mess: 'Server error' })
                        let pageCount = Math.ceil(count / pageSize) - 1
                        return res.status(200).send({
                            data: datas,
                            pageSize: pageSize,
                            pageNum: pageNum,
                            pageCount: pageCount,
                            totalItems: count
                        })
                    });
                });
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.get('/search', async (req, res)=>{
    try {
        const {searchKey} = req.query;
        if(!searchKey){
            return res.status(400).send({message: `searchKey is empty !`})
        }
        const result = await ProfileDB
            .find()
            .or([
                {'name': {$regex: searchKey}}, 
                {'email': {$regex: searchKey}}
            ])
        return res.status(200).send(result)
    } catch (err) {
        return err;
    }
})

router.get("/byID", async (req, res) => {
    try {
        const { id } = req.query;
        const idToken = req.header('Authorization')
        if (!id) {
            return res.status(400).send({ mess: `ID [null] not found` })
        }
        ProfileDB.findById(id, async (err, doc) => {
            if (err) {
                return res.status(404).send({ mess: `ID [${id}] not found` })
            }
            let docDenied = new ProfileModel()
            docDenied = { ...doc._doc }
            docDenied.email = undefined
            docDenied.gender = undefined
            docDenied.dob = undefined
            docDenied.phoneNumber = undefined
            docDenied.address = undefined
            docDenied.facebook = undefined
            docDenied.linkIn = undefined
            if (doc.styleUserRead == 'Everyone') {
                return res.status(200).send(doc)
            }
            //Người dùng ẩn danh
            if (!idToken) {
                if (doc.styleUserRead != 'Everyone') {
                    return res.status(200).send(docDenied)
                }
            }
            let decodedIdToken = await admin.auth().verifyIdToken(idToken).catch(function (error) {
                //Token bị quá hạn hoặc không đúng
                res.status(400).send('Bad reqest!');
            });
            let currentUser = await ProfileDB.findOne({ uid: decodedIdToken.uid })
            let currentUserIsATC = await atcDB.findOne({ uid: currentUser.uid }) ? true : false
            //atc hoặc chủ profile
            if (currentUserIsATC || (doc.uid == currentUser.uid)) {
                return res.status(200).send(doc)
            }
            //Member
            if (doc.styleUserRead == 'Member' && currentUser.roles.length == 0) {
                return res.status(200).send(doc)
            }
            //Core Member
            else if (doc.styleUserRead == 'Core Member' && currentUser.roles.length != 0) {
                return res.status(200).send(doc)
            }
            //Member and Core Member
            else if (doc.styleUserRead == 'Member and Core Member') {
                return res.status(200).send(doc)
            }
            //Ngoại lệ bị từ chối quyền xem
            else {
                return res.status(200).send(docDenied)
            }

        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.get('/community', async (req, res) => {
    try {
        let { size, roleId, last } = req.query;
        if (roleId === 'undefined') {
            let response = await ProfileDB
                .find()
                .sort({ "profileMetadata.updated": 1 })
                .limit(size)
            return res.status(200).send(response)
        } else {
            let response = await ProfileDB
                .find({ roles: roleId })
                .sort({ "profileMetadata.updated": 1 })
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
            ProfileDB.findOne({ uid: uid }, (err, doc) => {
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