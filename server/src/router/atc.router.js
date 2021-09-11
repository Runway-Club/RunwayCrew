const app = require('express');
const atcSchema = require('../../schemas/atc.schema');
let mongoose = require('mongoose');
const router = app.Router();

const atc = mongoose.model('atc', atcSchema);

router.get("/", async (req, res) => {
    try {
        let data;
        if (req.query.uid!= undefined)
            data = await atc.findOne({ uid: req.query['uid'] })
        else
            data = await atc.find()
        res.status(200)
        res.send(data)
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});


router.post("/", async (req, res) => {
    try {
        let { address, email, uid, dob, name, linkIn, gender, facebook, phoneNumber, photoUrl,actor,} = req.body
        const fluffy = new atc({
           address: address,
           email: email,
           uid:uid,
           contribMetadata: {
              actor: actor,
              created: Date.now().toString(),
              updated: Date.now().toString(),
           },
           dob: dob,
           facebook: facebook,
           gender: gender,
           linkIn: linkIn,
           name: name,
           phoneNumber: phoneNumber,
           photoUrl: photoUrl,
           profileMetadata:{
              updated: Date.now().toString(),
           },
           roles:[],
           selectedRoles:[],
        });
        await fluffy.save();
        res.status(200)
        res.send({ mess: 'Created' })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })

    }
});

module.exports = router;