const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

router.get('/table/list', (req, res) => {
  const items = data.items
  res.send({
    code: 20000,
    data: {
      total: items.length,
      items: items
    }
  })

})


module.exports = router
