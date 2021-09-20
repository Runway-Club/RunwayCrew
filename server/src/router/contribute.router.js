const app = require('express');
const contributeSchema = require('../../schemas/contribute.schema')
let mongoose = require('mongoose');
const contribute = require('../../schemas/contribute.schema');
const router = app.Router();
const Contribute = mongoose.model('contribute', contributeSchema)

const ContriModel = require('../../model/contribution.model')
const shareService = require('../service/share.service');

router.get("/", async (req, res) => {
    const { id } = req.query;
    if (!id) {
        try {
            let data;
            data = await Contribute.find()
            res.status(200)
            res.send(data)
        } catch (err) {
            console.log(err)
            res.status(500)
            res.send({ mess: 'Server err' })
        }
    }
    else {
        try {
            res.send(await Contribute.findById(id))
        } catch (error) {
            console.log(err)
            res.status(500)
            res.send({ mess: 'Server err' })
        }
    }
});
// router.post("/", async (req, res) => {
//     try {
//         let { credit, email, exp, uid, achievements, skills } = req.body
//         const fluffy = new Contribute({
//             achievements: achievements,
//             credit: credit,
//             email: email,
//             exp: exp,
//             uid: uid,
//             skills: skills,
//         });
//         await fluffy.save();
//         res.status(201)
//         res.send({ mess: 'Created' })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500)
//         res.send({ mess: 'Server err' })
//     }
// });
router.post("/", async (req, res) => {
    try {
        let { err, data } = shareService.parseBodyToObject(new ContriModel(), req.body)
        if (err != null) {
            return res.status(400).send({ mess: `Some field is missing: [${err}]. Please, check your data.` })
        }
        else {
            let newcontri = new Contribute(data)
            await newcontri.save().then(savedDoc => {
                if (savedDoc === newcontri)
                    return res.status(201).send({ mess: `Contribute [${savedDoc._id}] is created` })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
router.put("/", async (req, res) => {
    const id = req.body.id;
    const credit = req.body.credit;
    const email = req.body.email;
    const exp = req.body.exp;
    const uid = req.body.uid;
    try {
        let resdb = await Contribute.findByIdAndUpdate(id,
            {
                "credit": credit,
                "exp": exp,
                "email": email,
                "uid": uid
            }, { rawResult: true });
        if (!resdb.lastErrorObject.updatedExisting) {
            res.send({ mess: `[${req.body.id}] not found` })
        }
        else {
            res.send({ mess: `[${req.body.id}] updated` })
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send("Server error")
    }
})
router.delete("/", async (req, res) => {
    const id = req.query.id;

    try {
        await Contribute.findByIdAndDelete(id, (err, docs) => {
            if (err) {
                res.send({ mess: "Not Faund", docs })
            }
            else {
                res.status(200)
                res.send({ mess: `ok`, docs })

            }
        });
    } catch (errr) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
})
module.exports = router;
