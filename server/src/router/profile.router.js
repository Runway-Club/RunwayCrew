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
router.put("/edit", async(req,res)=>{
    const id = req.query;
    const address = req.body.address;
    const actor = req.body.actor;
    const created = req.body.created;
    const dob = req.body.dob;
    const email = req.body.email;
    const facebook = req.body.facebook;
    const gender = req.body.gender;
    const linkIn = req.body.linkIn;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const update = req.body.update;
    try {
        await Profile.findByIdAndUpdate(id ,{"address":address, "contribMetadata":contribMetadata,"actor":actor,"created":created,"dob":dob,"email":email,"facebook":facebook,"gender":gender,"linkIn":linkIn,"name":name,"phoneNumber":phoneNumber,"update":update})
    } catch (error) {
        console.log(err)
            res.status(400)
            res.send({ mess: 'Server err' })
    }
})
router.delete("/delete", async(req,res)=>{
    const {id}= req.body;
    try {
        await Profile.findByIdAndDelete(id);
        res.status(200)
        res.send({mess: 'ok'})
    } catch (error) {
        console.log(err)
        res.status(400)
        res.send({ mess: 'Server err' })
    }
})
module.exports = router;