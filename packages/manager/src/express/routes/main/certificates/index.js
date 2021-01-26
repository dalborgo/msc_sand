import { couchQueries } from '@adapter/io'
import { validation } from '@adapter/common'
const { utils } = require(__helpers)
const INITIAL_COUNT = 1000
const knex = require('knex')({ client: 'mysql' })
async function getSequence (connClass) {
  const statement = 'SELECT RAW '
                    + 'IFNULL(MAX(sequence), 0) '
                    + 'FROM ' + connClass.projectBucketName + ' '
                    + 'WHERE type = "CERTIFICATE"'
  const { ok, results, message, err } = await couchQueries.exec(statement, connClass.cluster)
  if (!ok) {return { ok, message, err }}
  let [sequence] = results
  return { ok, results: sequence ? ++sequence : INITIAL_COUNT + 1 }
}
const listFields = ['code']
function addRouters (router) {
  router.post('/certificates/save', async function (req, res) {
    const { connClass, body } = req
    const { ok, results: sequence, message, err } = await getSequence(connClass)
    if (!ok) {return res.send({ ok, message, err })}
    const { projectBucketCollection: collection } = connClass
    const code = `IT${sequence}`
    const input = {
      ...body,
      _createdAt: (new Date()).toISOString(),
      code,
      sequence,
      type: 'CERTIFICATE',
    }
    await collection.insert(`CERTIFICATE|${code}`, input)
    res.send({ ok: true, results: validation.filterByArray(input, listFields) })
  })
  router.get('/certificates/list', async function (req, res) {
    const { connClass, query } = req
    utils.controlParameters(query, [])
    const {
      bucketName = connClass.projectBucketName,
      options,
    } = query
    const statement = knex(bucketName)
      .where({ type: 'CERTIFICATE' })
      .select(listFields)
      .orderBy('sequence', 'desc')
      .toQuery()
    const { ok, results, message, err } = await couchQueries.exec(statement, connClass.cluster, options)
    if (!ok) {return res.send({ ok, message, err })}
    res.send({ ok, results })
  })
}

export default {
  addRouters,
}
