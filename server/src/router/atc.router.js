const app = require('express');
const atcSchema = require('../../schemas/atc.schema');
let mongoose = require('mongoose');
const router = app.Router();
const atcDB = mongoose.model('atc', atcSchema);

const ATCModel = require('../../model/atc.model')
const shareService = require('../service/share.service');

router.get('/', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        res.status(200).send(await atcDB.find());
    } else {
        atcDB.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

// router.post("/", async (req, res) => {
//     try {
//         let { address, email, id, dob, name, linkIn, gender, facebook, phoneNumber, photoUrl,profileMetadata, contribMetadata, roles, selectedRoles } = req.body
//         const fluffy = new atc({
//             address: address,
//             email: email,
//             contribMetadata: contribMetadata,
//             dob: dob,
//             facebook: facebook,
//             gender: gender,
//             linkIn: linkIn,
//             name: name,
//             phoneNumber: phoneNumber,
//             photoUrl: photoUrl,
//             profileMetadata: profileMetadata,
//             roles: roles,
//             selectedRoles: selectedRoles,
//         });
//         await fluffy.save();
//         res.status(200)
//         res.send({ mess: 'Created' })
//     } catch (err) {
//         console.log(err)
//         res.status(500)
//         res.send({ mess: 'Server err' })
//     }
// });

router.post("/", async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new ATCModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newAtc = new atcDB(data)
            await newAtc.save().then(savedDoc => {
                if (savedDoc === newAtc)
                    return res.status(201).send({ mess: `Atc [${savedDoc._id}] is created` })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.put("/", async (req, res) => {
    try {
        let _id = req.body._id
        let resdb = await atcDB.findByIdAndUpdate(_id, {
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
        
        if(!resdb.lastErrorObject.updatedExisting){
            res.status(404).send({ mess: `[${req.body._id}] is not found` })
        }
        else{
            res.status(200).send({ mess: `[${req.body._id}] is updated` })
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
            res.send({mess:`[id] field is missing`})
        }
        atcDB.findByIdAndDelete(_id, function (err, docs) {
            if (err) {
                res.status(404)
                res.send({mess:`[${_id}] not found`})
            }
            else {
                res.status(200)
                res.send({ mess: ` [${_id}] is deleted` })
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

module.exports = router;