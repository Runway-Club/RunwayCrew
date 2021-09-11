const app = require('express');
const profilesSchema = require('../../schemas/profile.schema')

let mongoose = require('mongoose');
const router = app.Router();

const Profile = mongoose.model('profiles',profilesSchema)
router.get("/", async (req, res) => {
    try {
        let data;
        data = await Profile.find()
        res.status(200)
        res.send(data)
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.post("/profiles", async (req, res) =>{
    try {
        let {address, actor, created, updated, dob, email, facebook,gender, linkIn, name, phoneNumber, photoUrl, update, uid} = req.body
        const fluffy = new Profile({
            address: address,
            contribMetadata:{
                actor: actor,
                created: created,
                updated: updated,
            },
            dob: dob,
            email: email,
            facebook: facebook,
            gender: gender,
            linkIn: linkIn,
            name: name,
            phoneNumber: phoneNumber,
            photoUrl: photoUrl,
            profileMetadata: {
                update: update,
            },
            roles:[],
            selectedRoles:[],
            uid: uid,
        });
        await fluffy.save();
        res.status(200)
        res.send({ mess: fluffy })
    } 
    catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
module.exports = router;