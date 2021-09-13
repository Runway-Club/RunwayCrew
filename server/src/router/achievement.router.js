const app = require('express');
const achievementSchema = require('../../schemas/achievement.schema');
let mongoose = require('mongoose');
const router = app.Router();

const achievement = mongoose.model('achievements', achievementSchema);

router.get('/', async (req, res)=>{
    let {id} = req.query;

    if(!id){
        res.send(await achievement.find());
    }else{
        res.send(await achievement.findOne({id:id}));
    }
})

router.post('/', async (req, res)=>{
    let {credit, description, exp, image, actor, name, skillId} = req.body;
    try{
        const _achievement = new achievement({
            id: Date.now().toString(),
            credit:credit,
            exp:exp,
            description:description,
            image:image,
            metadata:{
                actor:actor,
                created: Date.now().toString(),
                updated: Date.now().toString(),
            },
            name:name,
            skill:[
                {
                    exp: exp,
                    skillId:skillId
                }
            ]
        })
        await _achievement.save();
        res.status(200);
        res.send({achievement: _achievement});
    }catch(err){
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.put('/', async (req, res)=>{
    let {_id} = req.query;
    let {exp, description, image, name, actor, credit} = req.body;
    try{
        await achievement.findByIdAndUpdate(
        _id, 
        {
            "id":id,
            "credit":credit,
            "description":description,
            "image":image,
            "metadata.actor":actor,
            "metadata.updated": Date.now().toString(),
            "name":name
        },
        {rawResult: true});
        res.send(`updated ${_id}`);
    }catch(err){
        console.error(err);
    }
})
router.delete('/', async (req, res)=>{
    let {_id} = req.query;
    try {
        await achievement.findByIdAndDelete(_id);
        res.send(`deleted ${_id}`)
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;