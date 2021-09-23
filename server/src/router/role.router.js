const app = require('express');
const roleSchema = require('../../schemas/role.schema');
let mongoose = require('mongoose');
const router = app.Router();

const roleDB = mongoose.model('roles', roleSchema);

const RoleModel = require('../../model/role.model')
const shareService = require('../service/share.service');

router.get('/', async (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.status(200).send(await roleDB.find());
    }else{
        roleDB.findById(id, (err, result) => {
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
            let newRole = new roleDB(data)
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
    try {
        let {err, data} = shareService.parseBodyToObject(new RoleModel(), req.body);
        if(err !=null){
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }else{
            const _id = req.body._id;
            if(_id == undefined){
                return res.status(400).send({ message: `id empty` });
            }else{
                roleDB.findByIdAndUpdate(_id, data, (err, result)=>{
                    if(err){
                        return res.status(404).send({ message: `${_id} does not exits !` });
                    }else{
                        return res.status(200).send({ mess: `Role [${_id}] is updated !` });
                    }
                })
            }
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
    // let {_id, description, image, name, metadata} = req.body;
    // try{
    //     if(_id && description && image && name && metadata){
    //         role.findByIdAndUpdate(
    //             _id, 
    //         {
    //             "description":description,
    //             "image":image,
    //             "metadata":metadata,
    //             "name":name
    //         },
    //         (err, result)=>{
    //             if(err){
    //                 res.status(404).send(`${id} not found !`);
    //             }else{
    //                 res.status(200).send(`${id} updated !`)
    //             }
    //         });
    //     }else{
    //         res.status(400).send(`not enough value !`);
    //     }
    // }catch(err){
    //     res.status(500);
    //     console.error(err);
    // }
})
router.delete('/', async (req, res)=>{
    let {id} = req.query;
    try {
        roleDB.findByIdAndDelete(id,(err, doc)=>{
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