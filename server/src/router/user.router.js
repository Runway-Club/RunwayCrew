const app = require('express');
const userSchema = require('../../schemas/user.schema');
let mongoose = require('mongoose');
const router = app.Router();

const UserDB = mongoose.model('User', userSchema);

//get all user
router.get("/", async (req, res) => {
    try {
        let data;
        if (req.query.email != undefined)
            data = await UserDB.findOne({ email: req.query['email'] })
        else
            data = await UserDB.find()
        res.status(200)
        res.send(data)
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })
    }
});


//test create
// [POST] user/ 
// {
//     "firstName":"Tran Huynh",
//     "lastName":"Duc",
//     "email":"hsu.tranhuynhduc@gmail.com"
// }
router.post("/", async (req, res) => {
    try {
        let { firstName, lastName, email } = req.body
        const fluffy = new UserDB({
            name: {
                firstName: firstName,
                lastName: lastName,
            },
            loginTime: [
                { time: Date.now().toString(), IPaddress: '....' },
            ],
            email: email,
        });
        await fluffy.save();
        res.status(200)
        res.send({ mess: 'Created' })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send({ mess: 'Server err' })

    }
});

module.exports = router;