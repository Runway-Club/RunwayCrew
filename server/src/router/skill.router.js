const app = require('express');
const skillSchema = require('../../schemas/skill.schema');
let mongoose = require('mongoose');
const router = app.Router();

const skill = mongoose.model('skill', skillSchema);

router.get("/", async (req, res) => {
    try {
        let data;
        if (req.query.id!= undefined)
            data = await skill.findOne({_id: req.query['id'] })
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
router.put("/", async (req, res) => {
    try {
        let _id = req.body._id
        let resdb = await skill.findByIdAndUpdate(_id, {
            description: req.body.description,
            image: req.body.image,
            uid: req.body.uid,
            levels: req.body.levels,
            metadata: {
                actor: req.body.actor,
                created: 0,
                updated: 0,
            },
            name: req.body.name,
        }, { rawResult: true });
        
        if(!resdb.lastErrorObject.updatedExisting){
            res.send({ mess: `[${req.body._id}] is not found` })
        }
        else{
            res.send({ mess: `[${req.body._id}] is updated` })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.delete('/', async (req, res)=>{
    let {id} = req.query
    try {
        skill.findByIdAndDelete(id,(err, doc) => {
            if (err) {
                res.status(404).send({ message: `${id} does not exits !` });
            } else {
                res.status(200).send({ message: `deleted ${id}` });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

module.exports = router;