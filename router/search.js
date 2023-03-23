const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }))
}
NameList.push({ name: 'mock-Pan' })

router.get('/search/user', (req, res) => {
  const { name } = req.query
  const mockNameList = NameList.filter(item => {
    const lowerCaseName = item.name.toLowerCase()
    return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
  })
  res.send({
    code: 20000,
    data: { items: mockNameList }
  })
})

router.get('/transaction/list', (req, res) => {
  res.send({
    code: 20000,
    data: Mock.mock({
      total: 20,
      'items|20': [{
        order_no: '@guid()',
        timestamp: +Mock.Random.date('T'),
        username: '@name()',
        price: '@float(1000, 15000, 0, 2)',
        'status|1': ['success', 'pending']
      }]
    })
  })
})

module.exports = router
