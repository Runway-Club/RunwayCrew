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

router.post("/", async (req, res) => {
    try {
        let dataATC = ATCModel.anyToATC(req.body, false)
        let newATC = new atcDB(dataATC)
        newATC.save().then(savedDoc => {
            if (savedDoc === newATC)
                return res.status(201).send({ mess: `ATC [${savedDoc._id}] is created` })
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
        let dataATC = ATCModel.anyToATC(req.body, true)
        if (dataATC._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            atcDB.findByIdAndUpdate(dataATC._id, dataATC, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `ATC [${dataATC._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `ATC [${dataATC._id}] is updated !` });
                }
            })
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
})

router.delete('/', async (req, res) => {
    let _id = req.query.id
    try {
        if(req.query.id == undefined){
            res.status(400)
            res.send({mess:`[id] field is missing`})
            return
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