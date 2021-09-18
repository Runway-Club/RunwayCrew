const app = require('express');
const profilesSchema = require('../../schemas/profile.schema')


let mongoose = require('mongoose');
const router = app.Router();

const Profile = mongoose.model('profiles',profilesSchema)
router.get("/", async (req, res) => {
    const {id} = req.query;
    if(!id) {
        try {
            let data;
            data = await Profile.find()
            res.status(200)
            res.send(data)
        } catch (err) {
            console.log(err)
            res.status(400)
            res.send({ mess: 'Server err' })
        }
    }
    else{
        try {
            res.send(await Profile.findById(id))
        } catch (error) {
            console.log(err)
            res.status(400)
            res.send({ mess: 'Server err' })
        }
    }
});



router.post("/", async (req, res) =>{
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
        res.status(201)
        res.send({ mess: fluffy })
    } 
    catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.put("/", async(req,res)=>{
    const id = req.body.id;
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
    const photoUrl = req.body.photoUrl;
    const update = req.body.update;
    try {
        let resdb= await Profile.findByIdAndUpdate(id ,
            {"address":address,
             "actor":actor,"created":created,
             "dob":dob,"email":email,
             "facebook":facebook,
             "gender":gender,
             "linkIn":linkIn,
             "name":name,
             "phoneNumber":phoneNumber,
             "photoUrl":photoUrl,
             "update":update
            },{ rawResult: true });
            if(!resdb.lastErrorObject.updatedExisting){
                res.status(400)
                res.send({ mess: `[${req.body.id}] not found` })
            }
            else{
                res.status(200)
                res.send({ mess: `[${req.body.id}] updated` })
            }
    } catch (error) {
        console.log(error)
            res.status(500)
            res.send({ mess: 'Server err' })
    }
})
router.delete("/", async(req,res)=>{
    const id= req.query.id;
    try {
        
        Profile.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                if(docs != null){
                    res.status(200)
                    res.send({mess: "ok ", docs})
                }else{
                    res.status(404)
                    res.send({mess: "Not Faund", })
                }
            }
        });
    } catch (error) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})
module.exports = router;