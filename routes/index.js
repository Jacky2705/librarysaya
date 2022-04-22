const express = require('express')
const router = express.Router()


//all author route
router.get('/', (req,res) => {
    res.render('index')
})

module.exports = router