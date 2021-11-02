const express = require('express')

const router = express.Router()

const User = require('./models/User')

router.get('/', (req, res) => {
    res.json({ serverWorking: true})
})

router.post('/newUser', async (req, res) => {
    const user = req.body
    user._id = 0
    
    User.create(user).then(newUser => {
        console.log(`You've created a new user`, user);
        res.json(newUser)
    }).catch(err => {
        console.log(err);
    })
  })

  router.get("/userAuth/:id", async (req, res) => {
    let user = await User.findOne({ userId: req.params.id });
    console.log('User was found ' + user)
    res.json(user)
  })

module.exports = router;
