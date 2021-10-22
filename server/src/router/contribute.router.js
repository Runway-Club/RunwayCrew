const app = require('express');
let mongoose = require('mongoose');
const contributeSchema = require('../../schemas/contribute.schema');
const router = app.Router();
const contributeDB = mongoose.model('contribute', contributeSchema)

const ContriModel = require('../../model/contribution.model')
const shareService = require('../service/share.service');

router.get("/uid", async (req, res) => {
    const {uid} = req.query;
    try {
        let data;
        if (uid == undefined) {
            data = await contributeDB.find()
            return res.status(200).send(data)
        }
        else {
            contributeDB.find({uid:uid}, (err, doc) => {
                if (err) {
                    return res.status(404).send({ mess: `[${uid}] not found` })
                }
                else {
                    return res.status(200).send(doc[0])
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})

router.get("/", async (req, res) => {
    const { id } = req.query;
    try {
        let data;
        if (id == undefined) {
            data = await contributeDB.find()
            return res.status(200).send(data)
        }
        else {
            contributeDB.findById(id, (err, doc) => {
                if (err) {
                    return res.status(404).send({ mess: `[${id}] not found` })
                }
                else {
                    return res.status(200).send(doc)
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});

router.post("/", async (req, res) => {
    try {
        let dataContri = ContriModel.anyToContri(req.body, false)
        let newContri = new contributeDB(dataContri)
        newContri.save().then(savedDoc => {
            if (savedDoc === newContri)
                return res.status(201).send({ mess: `Contribute [${savedDoc._id}] is created` })
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
        let dataContri = ContriModel.anyToContri(req.body, true)
        if (dataContri._id == '') {
            return res.status(400).send({ message: `[_id] missing` });
        } else {
            contributeDB.findByIdAndUpdate(dataContri._id, dataContri, (err, result) => {
                if (err) {
                    return res.status(404).send({ message: `Contribute [${dataContri._id}] does not exits !` });
                } else {
                    return res.status(200).send({ mess: `Contribute [${dataContri._id}] is updated !` });
                }
            })
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
})

router.delete("/", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send({ mess: `[id] is empty` })
        }
        contributeDB.findByIdAndDelete(id, function (err, docs) {
            if (err)
                return res.status(404).send({ mess: `Profile [${id}] not found` })
            else
                return res.status(200).send({ mess: `Profile [${id}] is deleted` })
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({ mess: 'Server err' })
    }
})
module.exports = router;
