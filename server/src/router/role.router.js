const app = require('express');
const roleSchema = require('../../schemas/role.schema');
let mongoose = require('mongoose');
const router = app.Router();

const roleDB = mongoose.model('roles', roleSchema);

const RoleModel = require('../../model/role.model')
const shareService = require('../service/share.service');

const ROLES = []

router.get('/id', async (req, res) => {
    let { roleId } = req.query;
    if (!roleId) {
        res.status(200).send(await roleDB.find());
    } else {
        roleDB.find({id:roleId}, (err, doc) => {
            if (err) {
                return res.status(404).send({ mess: `[${roleId}] not found` })
            }
            else {
                return res.status(200).send(doc[0])
            }
        })
    }
})

router.get('/search', async (req, res)=>{
    try {
        const {searchKey} = req.query;
        if(!searchKey){
            return res.status(400).send({message: `searchKey is empty !`})
        }
        if(ROLES.length === 0){
            let response =  await roleDB.find();     
            response.map(role=>{
                ROLES.push(role)
            })
        }
        let result = ROLES.filter(role =>{
            return role.name.toLowerCase().includes(searchKey.toLowerCase())
        })
        return res.status(200).send(result)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get('/', async (req, res) => {
    let { id } = req.query;
    if (!id) {
        res.status(200).send(await roleDB.find());
    } else {
        roleDB.findById(id, (err, result) => {
            if (err) {
                res.status(404).send({ message: `${id} not found !` });
            } else {
                res.status(200).send(result);
            }
        })
    }
})

router.post("/", async (req, res) => {
    try {
        let dataRole = RoleModel.anyToRole(req.body, false)
        let newRole = new roleDB(dataRole)
        newRole.save().then(savedDoc => {
            if (savedDoc === newRole)
                return res.status(201).send({ mess: `Role [${savedDoc._id}] is created` })
            else
                return res.status(500).send({ mess: 'Server err' })
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.put('/', async (req, res) => {
    try {
        let dataRole = RoleModel.anyToRole(req.body, true)
        if (dataRole._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            roleDB.findByIdAndUpdate(dataRole._id, dataRole, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `Role [${dataRole._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `Role [${dataRole._id}] is updated !` });
                }
            })
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
})

router.delete('/', async (req, res) => {
    try {
        let { id } = req.query;
        if (id == undefined) {
            return res.status(400).send(`ID is missing`)
        }


        roleDB.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.status(404).send(`${id} not found !`)
            } else {
                res.status(200).send(`${id} deleted !`)
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send(`Server err`)
    }
})

module.exports = router;