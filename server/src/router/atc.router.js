const app = require('express');
const atcSchema = require('../../schemas/atc.schema');
let mongoose = require('mongoose');
const router = app.Router();

const atc = mongoose.model('atc', atcSchema);

router.get("/", async (req, res) => {
    try {
        let data;
        if (req.query.id != undefined)
            data = await atc.findOne({ id: req.query['id'] })
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
        let { address, email, id, dob, name, linkIn, gender, facebook, phoneNumber, photoUrl, actor, roles, selectedRoles } = req.body
        const fluffy = new atc({
            address: address,
            email: email,
            id: id,
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
            profileMetadata: {
                updated: Date.now().toString(),
            },
            roles: roles,
            selectedRoles: selectedRoles,
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

router.put("/", async (req, res) => {
    try {
        let _id = req.body.id
        let resdb = await atc.findByIdAndUpdate(_id, {
            address: req.body.address,
            email: req.body.email,
            uid: req.body.uid,
            contribMetadata: {
                actor: req.body.actor,
                created: 0,
                updated: 0,
            },
            dob: req.body.dob,
            facebook: req.body.facebook,
            gender: req.body.gender,
            linkIn: req.body.linkIn,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            photoUrl: req.body.photoUrl,
            profileMetadata: {
                updated: 0,
            },
            roles: req.body.roles,
            selectedRoles: req.body.selectedRoles,
        }, { rawResult: true });

        if (!resdb.lastErrorObject.updatedExisting) {
            res.send({ mess: `[${req.body._id}] is not found` })
        }
        else {
            res.send({ mess: `[${req.body._id}] is updated` })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.delete('/', async (req, res) => {
    let _id = req.query.id
    try {
        if(req.query.id == undefined){
            res.status(400)
            res.send(`[id] field is missing`)
        }
        atc.findByIdAndDelete(_id, function (err, docs) {
            if (err) {
                res.status(404)
                res.send(`[${_id}] not found`)
            }
            else {
                res.status(200)
                res.send({ mess: ` [${_id}] is deleted` })
            }
        });

        // let resDB = atc.findByIdAndDelete(_id, { rawResult: true })
        // if (!resDB.lastErrorObject.updatedExisting) {
        //     res.status(404)
        //     res.send(`[${_id}] not found`)
        // }
        // else {
        //     res.status(200)
        //     res.send({ mess: ` [${req.body._id}] is deleted` })
        // }


    } catch (err) {
        console.log(err);
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

module.exports = router;