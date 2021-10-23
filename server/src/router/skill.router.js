const app = require('express');
const skillSchema = require('../../schemas/skill.schema');
let mongoose = require('mongoose');
const router = app.Router();
const skillDB = mongoose.model('skill', skillSchema);

const SkillModel = require('../../model/skill.model')
const shareService = require('../service/share.service');

router.get('/', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        res.status(200).send(await skillDB.find());
    } else {
        skillDB.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

router.get('/id', async (req, res) => {
    let { skillId } = req.query;
    if (!skillId) {
        res.status(200).send(await skillDB.find());
    } else {
        skillDB.find({id:skillId}, (err, doc) => {
            if (err) {
                return res.status(404).send({ mess: `[${skillId}] not found` })
            }
            else {
                return res.status(200).send(doc[0])
            }
        })
    }
})

router.post("/", async (req, res) => {
    try {
        let dataSkill = SkillModel.anyToSkill(req.body, false)
        let newSkill = new skillDB(dataSkill)
        newSkill.save().then(savedDoc => {
            if (savedDoc === newSkill)
                return res.status(201).send({ mess: `Skill [${savedDoc._id}] is created` })
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
        let dataSkill = SkillModel.anyToSkill(req.body, true)
        if (dataSkill._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            skillDB.findByIdAndUpdate(dataSkill._id, dataSkill, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `Skill [${dataSkill._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `Skill [${dataSkill._id}] is updated !` });
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
            res.send(`[id] field is missing`)
            return
        }
        skillDB.findByIdAndDelete(_id, function (err, docs) {
            if (err) {
                res.status(404)
                res.send(`[${_id}] not found`)
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