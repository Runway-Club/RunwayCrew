const app = require('express');
const contributeSchema = require('../../schemas/contribute.schema')

let mongoose = require('mongoose');
const router = app.Router();

const Contribute = mongoose.model('contribute', contributeSchema)

router.get("/", async (req, res) => {
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
});

router.post("/contribute", async (req, res) =>{
    try {
        let {credit, email,exp, uid} = req.body
        const fluffy = new Contribute({
            achievements: [],
            credit: credit,
            email: email,
            exp:exp,
            uid: uid,
            skills: [],
        });
        await fluffy.save();
        res.status(200)
        res.send({ mess: 'Created' })
    } 
    catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});
module.exports = router;
    