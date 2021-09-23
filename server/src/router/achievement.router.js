const app = require('express');
const achievementSchema = require('../../schemas/achievement.schema');
let mongoose = require('mongoose');
const router = app.Router();
const AchiModel = require('../../model/achievement.model')
const shareService = require('../service/share.service')
const achievementDB = mongoose.model('achievements', achievementSchema);

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

// router.post('/', async (req, res) => {
//     let { credit, description, exp, image, name, metadata, skill } = req.body;
//     try {
//         if (credit && description && exp && image && skill && metadata && name) {
//             const _achievement = new achievement({
//                 credit: credit,
//                 exp: exp,
//                 description: description,
//                 image: image,
//                 metadata: metadata,
//                 name: name,
//                 skill: skill
//             })
//             await _achievement.save();
//             res.status(201).send({ message: `${_achievement._id} created` });
//         } else {
//             res.status(400).send({ message: `not enough value !` })
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500)
//         res.send({ mess: 'Server err' })
//     }
// })

router.post("/", async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new AchiModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newAchi = new achievement(data)
            await newAchi.save().then(savedDoc => {
                if (savedDoc === newAchi)
                    return res.status(201).send({ mess: `Achievement [${savedDoc._id}] is created` })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.put('/', async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new AchiModel(), req.body);
        const _id = req.body._id;
        if(_id == undefined){
            return res.status(400).send({ message: `id empty` });
        }else{
            if(err != null){
                return res.status(400).send({mess: `Some field is missing: [${err}]. Please, check your data.` });
            }else{
                achievementDB.findByIdAndUpdate(_id, data, (err, result)=>{
                    if(err){
                        return res.status(404).send({ message: `${_id} does not exits !` });
                    }else{
                        return res.status(200).send({ mess: `Achievement [${_id}] is updated !` });
                    }
                })
            }
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
   
    // let { _id, exp, description, image, name, metadata, credit, skill } = req.body;
    // try {
    //     if (_id && exp && description && image && name && metadata && credit && skill) {
    //         achievement.findByIdAndUpdate(
    //             _id,
    //             {
    //                 "credit": credit,
    //                 "description": description,
    //                 "image": image,
    //                 "metadata": metadata,
    //                 "name": name,
    //                 "exp": exp,
    //                 "skill": skill
    //             }, (err, result) => {
    //                 if (err) {
    //                     res.status(404).send(`${id} not found !`);
    //                 } else {
    //                     res.status(200).send(`${id} updated !`);
    //                 }
    //             });
    //     } else {
    //         res.status(400).send(`not enough value !`)
    //     }
    // } catch (err) {
    //     console.error(err);
    // }
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