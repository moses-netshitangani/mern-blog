const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

// add admin
// router.route('/add').post(async (req, res) => {
//     // password encryption
//     try {
//         const salt = await bcrypt.genSalt();
//         const hashedP = await bcrypt.hash(req.body.password, salt);

//         const userObject = {
//             username: req.body.username,
//             password: hashedP
//         }
//         const user = new User(userObject);
//         console.log(`user object: ${user}`);

//         user.save()
//             .then(user => res.json(user))
//             .then(console.log('Admin successfully added.'))
//             .catch(err => res.status(400).json("Error tryna save admin") + err);
//     } catch {
//         res.status(500).send();
//     }

    
// })

// retrieve admin
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error tryna get admin") + err);
})

module.exports = router;