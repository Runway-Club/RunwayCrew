const app = require('express');
const roleSchema = require('../../schemas/role.schema');
let mongoose = require('mongoose');
const router = app.Router();

const role = mongoose.model('roles', roleSchema);

router.get('/roles', async (req, res)=>{
    let {id} = req.query;

    if(!id){
        res.send(await role.find());
    }else{
        res.send(await role.findOne({id:id}));
    }
})

router.post('/role', async (req, res)=>{
    let {id, description, image, actor, name} = req.body;
    try{
        const _role = new role({
            id:id,
            description:description,
            image:image,
            metadata:{
                actor:actor,
                created: Date.now().toString(),
                updated: Date.now().toString(),
            },
            name:name
        })
        await _role.save();
        res.status(200);
        res.send({role: _role});
    }catch(err){
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})
router.put('/role', async (req, res)=>{
    let {_id} = req.query;
    let {id, description, image, name, actor} = req.body;
    try{
        await role.findByIdAndUpdate(
        _id, 
        {
            "id":id,
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
router.delete('/role', async (req, res)=>{
    let {_id} = req.query;
    try {
        await role.findByIdAndDelete(_id);
        res.send(`deleted ${_id}`)
    } catch (err) {
        console.error(err);
    }
})


module.exports = router;