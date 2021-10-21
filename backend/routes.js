const express = require('express')

const router = express.Router()



const User = require('./models/User')


router.get('/', (req, res) => {
    res.json({ serverWorking: true})
})


router.post('/newUser', async (req, res) => {
    let user = req.body
    console.log(user);
    User.create(user).then(newUser => {
        console.log(`You've created a new user`);
        res.json(newUser)
    }).catch(err =>{
        console.log(err);
    })
  
})

module.exports = router
