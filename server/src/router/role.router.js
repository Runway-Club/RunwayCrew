const app = require('express');
const roleSchema = require('../../schemas/role.schema');
let mongoose = require('mongoose');
const router = app.Router();

const role = mongoose.model('roles', roleSchema);

const RoleModel = require('../../model/role.model')
const shareService = require('../service/share.service');

router.get('/', async (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.status(200).send(await role.find());
    }else{
        role.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

// router.post('/', async (req, res)=>{
//     let {description, image, name , metadata} = req.body;
//     try{
//         if(description && image && metadata && name){
//             const _role = new role({
//                 description: description,
//                 image: image,
//                 metadata: metadata,
//                 name: name
//             })
//             await _role.save();
//             res.status(201).send({ message: `${_role._id} created` });
//         }else{
//             res.status(400).send(`not enough value !`);
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500)
//         res.send({ mess: 'Server err' })
//     }
// })
router.post("/", async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new RoleModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newRole = new role(data)
            await newRole.save().then(savedDoc => {
                if (savedDoc === newRole)
                    return res.status(201).send({ mess: `Role [${savedDoc._id}] is created` })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.put('/', async (req, res)=>{
    let {_id, description, image, name, metadata} = req.body;
    try{
        if(_id && description && image && name && metadata){
            role.findByIdAndUpdate(
                _id, 
            {
                "description":description,
                "image":image,
                "metadata":metadata,
                "name":name
            },
            (err, result)=>{
                if(err){
                    res.status(404).send(`${id} not found !`);
                }else{
                    res.status(200).send(`${id} updated !`)
                }
            });
        }else{
            res.status(400).send(`not enough value !`);
        }
    }catch(err){
        res.status(500);
        console.error(err);
    }
})
router.delete('/', async (req, res)=>{
    let {id} = req.query;
    try {
        role.findByIdAndDelete(id,(err, doc)=>{
            if(err){
                res.status(404).send(`${id} not found !`)
            }else{
                res.status(200).send(`${id} deleted !`)
            }
        });
    } catch (err) {
        console.error(err);
    }
})


module.exports = router;