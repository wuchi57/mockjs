const express = require('express')
const router = express.Router()
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('../routes')
const Mock = require('mockjs')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

router.get('/routes', (req, res) => {
  res.send({
    code: 20000,
    data: routes
  })
})

router.get('/roles', (req, res) => {
  res.send({
    code: 20000,
    data: roles
  })
})

router.get('/role', (req, res) => {
  res.send({
    code: 20000,
    data: Mock.mock('@integer(300, 5000)')
  })
})

router.put('/role/:userId', (req, res) => {
  res.send({
    code: 20000,
    data: {
      data: 'success'
    }
  })
})

router.delete('/role/:userId', (req, res) => {
  res.send({
    code: 20000,
    data: {
      data: 'success'
    }
  })
})

module.exports = router
