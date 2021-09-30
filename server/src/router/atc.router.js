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
        let _id = req.body._id;
        let {err, data} = shareService.parseBodyToObject( new ATCModel(), req.body);
        if (_id ==  undefined) {
            return res.status(400).send({ mess: `[${req.body._id}] is not found` })
        }
        else {
            if (err != null) {
                return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
            }
            else {
                   atcDB.findByIdAndUpdate(_id, data, (err, result)=>{
                    if (err) {
                       return res.status(404).send({ mess: `${_id} is not found`})  
                    }else 
                    {
                        return res.status(200).send({mess: `${_id} is update`})
                    }
                   })
                }
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