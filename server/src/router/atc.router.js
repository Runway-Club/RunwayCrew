const app = require('express');
const atcSchema = require('../../schemas/atc.schema');
let mongoose = require('mongoose');
const router = app.Router();
const atcDB = mongoose.model('atc', atcSchema);
const verifyToken = require('../verify-token');
const ATCModel = require('../../model/atc.model')
const shareService = require('../service/share.service')


router.get('/', verifyToken, async (req, res) => {

    let user = await shareService.getUserOfToken(req)
    
    let isAtc = await atcDB.findOne({uid:user.uid})

    if(!isAtc){
        return res.status(403).status({message: `You isn't ATC!`})
    }
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

router.get('/uid', async (req, res) => {
    let { uid } = req.query;
    if (!uid) {
        res.status(200).send(await atcDB.find());
    } else {
        atcDB.findOne({ uid: uid }, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

router.post("/", verifyToken ,async (req, res) => {
    try {

        let user = await shareService.getUserOfToken(req)
    
        let isAtc = await atcDB.findOne({uid:user.uid})
    
        if(!isAtc){
            return res.status(403).status({message: `You isn't ATC!`})
        }

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

router.put('/', verifyToken,  async (req, res) => {
    try {
        let user = await shareService.getUserOfToken(req)
    
        let isAtc = await atcDB.findOne({uid:user.uid})
    
        if(!isAtc){
            return res.status(403).status({message: `You isn't ATC!`})
        }

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

router.delete('/',verifyToken, async (req, res) => {
    let _id = req.query.id
    try {
        let user = await shareService.getUserOfToken(req)
    
        let isAtc = await atcDB.findOne({uid:user.uid})
    
        if(!isAtc){
            return res.status(403).status({message: `You isn't ATC!`})
        }
        
        if (req.query.id == undefined) {
            res.status(400)
            res.send({ mess: `[id] field is missing` })
            return
        }
        atcDB.findByIdAndDelete(_id, function (err, docs) {
            if (err) {
                res.status(404)
                res.send({ mess: `[${_id}] not found` })
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

module.exports = router