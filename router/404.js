const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  res.status(404).send('404 页面未找到')
})

module.exports = router
