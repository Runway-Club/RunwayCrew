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
// router.post("/", async (req, res) => {
//     try {
//         let { description, id, image, actor, name} = req.body
//         const fluffy = new skill({
//             description: description,
//             id: id,
//             image: image,
//             levels:[],
//             metadata:{
//                 actor: actor,
//                 created: Date.now().toString(),
//                 updated: Date.now().toString(),
//             },
//             name: name,
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
        let { err, data } = shareService.parseBodyToObject(new SkillModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newSkill = new skillDB (data)
            await newSkill.save().then(savedDoc => {
                if (savedDoc === newSkill)
                    return res.status(201).send({ mess: `Skill [${savedDoc._id}] is created` })
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
        let {err, data} = shareService.parseBodyToObject( new skillModel(), req.body);
        if (_id ==  undefined) {
            return res.status(400).send({ mess: `[${req.body._id}] is not found` })
        }
        else {
            if (err != null) {
                return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
            }
            else {
                   skillDB.findByIdAndUpdate(_id, data, (err, result)=>{
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
            res.send(`[id] field is missing`)
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