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
    try {
        const { id } = req.query;
        const idToken = req.header('Authorization')
        if (id) {
            if (!idToken) {
                ProfileDB.findById(id, (err, doc) => {
                    if (err) {
                        return res.status(404).send({ mess: `ID [${id}] not found` })
                    }
                    if (doc.styleUserRead === 'Everyone') {
                        return res.status(200).send(doc)
                    } else {
                        doc.email = undefined
                        doc.name = undefined
                        doc.gender = undefined
                        doc.dob = undefined
                        doc.phoneNumber = undefined
                        doc.address = undefined
                        doc.facebook = undefined
                        doc.linkIn = undefined
                        return res.status(200).send(doc)
                    }
                })
            } else {
                admin.auth().verifyIdToken(idToken).then(async function (decodedClaims) {

                    let user = decodedClaims

                    let currentUser = await ProfileDB.findOne({ uid: user.uid })

                    let currentUserAtc = await atcDB.findOne({ uid: user.uid })

                    ProfileDB.findById(id, (err, doc) => {
                        if (err) {
                            return res.status(404).send({ mess: `ID [${id}] not found` })
                        }
                        else {
                            if (currentUser.uid === doc.uid) {
                                return res.status(200).send(doc)
                            }
                            else if (currentUserAtc) {
                                return res.status(200).send(doc)
                            }
                            else if (currentUser.roles.length !== 0 && doc.styleUserRead === 'Core Member') {
                                return res.status(200).send(doc)
                            }
                            else if (currentUser.roles.length === 0 && doc.styleUserRead === 'Member') {
                                return res.status(200).send(doc)
                            } else if (doc.styleUserRead === 'Member and Core Member') {
                                return res.status(200).send(doc)
                            } else {
                                doc.email = undefined
                                doc.name = undefined
                                doc.gender = undefined
                                doc.dob = undefined
                                doc.phoneNumber = undefined
                                doc.address = undefined
                                doc.facebook = undefined
                                doc.linkIn = undefined
                                return res.status(200).send(doc)
                            }
                        }
                    })
                }).catch(function (error) {
                    res.status(400).send('Bad reqest!');
                });
            }
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

router.get("/1", async (req, res) => {
    try {
        const { id } = req.query;
        const idToken = req.header('Authorization')
        if (!id) {
            return res.status(200).send(await ProfileDB.find())
        }
        ProfileDB.findById(id, async (err, doc) => {
            if (err) {
                return res.status(404).send({ mess: `ID [${id}] not found` })
            }
            let docDenied = new ProfileModel()
            docDenied = { ...doc._doc }
            docDenied.email = undefined
            docDenied.name = undefined
            docDenied.gender = undefined
            docDenied.dob = undefined
            docDenied.phoneNumber = undefined
            docDenied.address = undefined
            docDenied.facebook = undefined
            docDenied.linkIn = undefined
            if (doc.styleUserRead == 'Everyone')
                return res.status(200).send(doc)
            if (!idToken) {
                if (doc.styleUserRead != 'Everyone')
                    return res.status(200).send(docDenied)
            }
            let user = await admin.auth().verifyIdToken(idToken).catch(function (error) {
                //Token bị quá hạn hoặc không đúng
                res.status(400).send('Bad reqest!');
            });
            let currentUser = await ProfileDB.findOne({ uid: user.uid })
            let currentUserIsATC = await atcDB.findOne({ uid: user.uid }) ? true : false
            //atc
            if (currentUserIsATC)
                return res.status(200).send(doc)
            //Member
            if (doc.styleUserRead == 'Member' && currentUser.roles.length == 0)
                return res.status(200).send(doc)
            //Core Member
            else if (doc.styleUserRead == 'Core Member' && currentUser.roles.length != 0)
                return res.status(200).send(doc)
            //Member and Core Member
            else if (doc.styleUserRead == 'Member and Core Member')
                return res.status(200).send(doc)
            //Ngoại lệ bị từ chối quyền xem
            else
                return res.status(200).send(docDenied)
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