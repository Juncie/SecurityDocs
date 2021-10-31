const express = require('express')

const router = express.Router()

const User = require('./models/User')

router.get('/', (req, res) => {
    res.json({ serverWorking: true})
})

router.post('/newUser', async (req, res) => {
    const user = req.body
    User.create(user).then(newUser => {
        console.log(`You've created a new user`, user);
        res.json(newUser)
    }).catch(err => {
        console.log(err);
    })
  })

router.post('/findUser', async (req, res)=> {
  const user = await User.findOne({ userId: req.body.userId})
  res.json(user)
})

router.get("/getUser", async (req, res) => {
    let user = await User.findOne(user);
    res.json(user);
  });

module.exports = router;
