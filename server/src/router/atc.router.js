const app = require('express');
const atcSchema = require('../../schemas/atc.schema');
let mongoose = require('mongoose');
const router = app.Router();
const atc = mongoose.model('atc', atcSchema);

const ATCModel = require('../../model/atc.model')
const shareService = require('../service/share.service');

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
 
router.get('/:id', async (req, res) => {
    atc.findById(req.query.id, function(err){
      if (err) console.log(err);
      res.status(404)
      res.send({mess:`[${id}] not found`})
    })
});


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
            let newATC = new atc(data)
            await newATC.save().then(savedDoc => {
                if (savedDoc === newATC)
                    return res.status(201).send({ mess: `User [${savedDoc._id}] is created` })
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
        let { address, email, uid, dob, name, linkIn, gender, facebook, phoneNumber, photoUrl, actor, roles, selectedRoles } = req.body
        let _id = req.body.id
        let resdb = await atc.findByIdAndUpdate(_id, {
            address: address,
            email: email,
            uid: uid,
            contribMetadata: {
                actor: actor,
                created: 0,
                updated: 0,
            },
            dob: dob,
            facebook: facebook,
            gender: gender,
            linkIn: linkIn,
            name: name,
            phoneNumber: phoneNumber,
            photoUrl: photoUrl,
            profileMetadata: {
                updated: 0,
            },
            roles: roles,
            selectedRoles: selectedRoles,
        }, { rawResult: true });

        if (!resdb.lastErrorObject.updatedExisting) {
            res.status(404).send({ mess: `[${req.body._id}] is not found` })
        }
        else {
            res.status(200).send({ mess: `[${req.body._id}] is updated` })
        }
        
    } catch (err) {
        console.log(err)
        res.status(400)
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
        atc.findByIdAndDelete(_id, function (err, docs) {
            if (err) {
                res.status(404)
                res.send({mess:`[${_id}] not found`})
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