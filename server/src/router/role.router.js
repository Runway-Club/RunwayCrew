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

module.exports = router;