const app = require('express');
const achievementSchema = require('../../schemas/achievement.schema');
let mongoose = require('mongoose');
const router = app.Router();
const AchiModel = require('../../model/achievement.model')
const shareService = require('../service/share.service')
const achievementDB = mongoose.model('achievements', achievementSchema);

const ACHIEVEMENTS = []

router.get('/', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        res.status(200).send(await achievementDB.find());
    } else {
        achievementDB.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

router.get('/search', async (req, res)=>{
    try {
        const {searchKey} = req.query;
        if(!searchKey){
            return res.status(400).send({message: `searchKey is empty !`})
        }
        if(ACHIEVEMENTS.length === 0){
            let response =  await achievementDB.find();     
            response.map(achievement=>{
                ACHIEVEMENTS.push(achievement)
            })
        }
        let result = ACHIEVEMENTS.filter(achievement =>{
            return achievement.name.toLowerCase().includes(searchKey.toLowerCase())
        })
        return res.status(200).send(result)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.post("/", async (req, res) => {
    try {
        let dataAchi = AchiModel.anyToAchi(req.body, false)
        let newAchi = new achievementDB(dataAchi)
        newAchi.save().then(savedDoc => {
            if (savedDoc === newAchi)
                return res.status(201).send({ mess: `Achievement [${savedDoc._id}] is created` })
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
        let dataAchi = AchiModel.anyToAchi(req.body, true)
        if (dataAchi._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            achievementDB.findByIdAndUpdate(dataAchi._id, dataAchi, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `Achievement [${dataAchi._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `Achievement [${dataAchi._id}] is updated !` });
                }
            })
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
})


router.delete('/', async (req, res) => {
    let { id } = req.query;
    if (id == undefined) {
        res.status(400).send({ message: `id empty` })
    } else {
        try {
            achievementDB.findByIdAndDelete(id, (err, doc) => {
                if (err) {
                    res.status(404).send({ message: `${id} does not exits !` });
                } else {
                    res.status(200).send({ message: `deleted ${id}` });
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500);
        }
    }
})

module.exports = router;