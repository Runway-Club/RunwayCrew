const app = require('express');
const skillSchema = require('../../schemas/skill.schema');
let mongoose = require('mongoose');
const router = app.Router();

const skill = mongoose.model('skill', skillSchema);

router.get("/", async (req, res) => {
    try {
        let data;
        if (req.query.id!= undefined)
            data = await skill.findOne({ id: req.query['id'] })
        else
            data = await skill.find()
        res.status(200)
        res.send(data)
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});


router.post("/", async (req, res) => {
    try {
        let { description, id, image, actor, name} = req.body
        const fluffy = new skill({
            description: description,
            id: id,
            image: image,
            levels:[],
            metadata:{
                actor: actor,
                created: Date.now().toString(),
                updated: Date.now().toString(),
            },
            name: name,
        });
        await fluffy.save();
        res.status(200)
        res.send({ mess: 'Created' })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })

    }
});

module.exports = router;