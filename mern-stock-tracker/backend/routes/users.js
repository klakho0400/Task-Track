const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req,res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const username  = req.body.username;
    const rating = Number(req.body.rating);
    const email = req.body.email;
    const phone  = req.body.phone;
    const taskComplete = req.body.taskComplete;
    const taskIncomplete = req.body.taskIncomplete;
    

    const newUser = new User({
        username,
        rating,
        email,
        phone,
        taskComplete,
        taskIncomplete,
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router;