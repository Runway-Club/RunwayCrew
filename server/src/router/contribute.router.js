const app = require('express');
const contributeSchema = require('../../schemas/contribute.schema')

let mongoose = require('mongoose');
const contribute = require('../../schemas/contribute.schema');
const router = app.Router();

const Contribute = mongoose.model('contribute', contributeSchema)

router.get("/", async (req, res) => {
    const {id} = req.query;
    if(!id) {
        try {
            let data;
            data = await Contribute.find()
            res.status(200)
            res.send(data)
        } catch (err) {
            console.log(err)
            res.status(400)
            res.send({ mess: 'Server err' })
        }
    }
    else{
        try {
            res.send(await Contribute.findById(id))
        } catch (error) {
            console.log(err)
            res.status(400)
            res.send({ mess: 'Server err' })
        }
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
        res.status(400)
        res.send({ mess: 'Server err' })
    }
});
router.put("/edit", async(req,res)=>{
    const id = req.body.id;
    const credit = req.body.credit;
    const email = req.body.email;
    const exp = req.body.exp;
    console.log(id);
    try {
        await Contribute.findByIdAndUpdate(id, {"credit":credit, "exp":exp, "email": email});
        res.status(200)
        res.send("ok")
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send("lỗi")
    }
})
router.delete("/delete", async (req,res)=> {
    const {id} = req.query;

    try{
        await Contribute.findByIdAndDelete(id);
        res.status(200)
        res.send("Delete")
    } catch (error) {
        console.log(err)
        res.status(400)
        res.send({ mess: 'Server err' })
    }
})
module.exports = router;
    