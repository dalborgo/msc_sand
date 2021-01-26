import certificate from './certificate'
import docs from './docs'
import info from './info'
import jwt from './jwt'
import queries from './queries'
import routines from './routines'
import stats from './stats'
import types from './types'

const express = require('express')
const router = express.Router()
require('express-async-errors')

certificate.addRouters(router)
docs.addRouters(router)
info.addRouters(router)
jwt.addRouters(router)
queries.addRouters(router)
routines.addRouters(router)
stats.addRouters(router)
types.addRouters(router)

router.get('/', function (req, res) {
  res.redirect('/')
})

export default router


