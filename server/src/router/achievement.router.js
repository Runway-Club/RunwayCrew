const app = require('express');
const achievementSchema = require('../../schemas/achievement.schema');
let mongoose = require('mongoose');
const router = app.Router();

const achievement = mongoose.model('achievements', achievementSchema);

router.get('/', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        res.status(200).send(await achievement.find());
    } else {
        achievement.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

router.post('/', async (req, res) => {
    let { credit, description, exp, image, name, metadata, skill } = req.body;
    try {
        if (credit && description && exp && image && skill && metadata) {
            const _achievement = new achievement({
                credit: credit,
                exp: exp,
                description: description,
                image: image,
                metadata: metadata,
                name: name,
                skill: skill
            })
            await _achievement.save();
            res.status(201).send({ message: `${_achievement._id} created` });
        } else {
            res.status(400).send({ message: `not enough value !` })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.put('/', async (req, res) => {
    let { _id, exp, description, image, name, metadata, credit, skill } = req.body;
    try {
        if (_id && exp && description && image && name && metadata && credit && skill) {
            achievement.findByIdAndUpdate(
                _id,
                {
                    "credit": credit,
                    "description": description,
                    "image": image,
                    "metadata": metadata,
                    "name": name,
                    "exp": exp,
                    "skill": skill
                }, (err, result) => {
                    if (err) {
                        res.status(404).send(`${id} not found !`);
                    } else {
                        res.status(200).send(`${id} updated !`);
                    }
                });
        } else {
            res.status(400).send(`not enough value !`)
        }
    } catch (err) {
        console.error(err);
    }
})
router.delete('/', async (req, res) => {
    let { id } = req.query;
    if (id == undefined) {
        res.status(400).send({ message: `id empty` })
    } else {
        try {
            achievement.findByIdAndDelete(id, (err, doc) => {
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