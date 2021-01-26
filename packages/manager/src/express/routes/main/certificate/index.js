import { couchQueries } from '@adapter/io'

const INITIAL_COUNT = 1000

async function getSequence (connClass) {
  const statement = 'SELECT RAW '
                    + 'IFNULL(MAX(meta.sequence), 0) '
                    + 'FROM ' + connClass.projectBucketName + ' '
                    + 'WHERE type = "CERTIFICATE"'
  
  const { ok, results, message, err } = await couchQueries.exec(statement, connClass.cluster)
  if (!ok) {return { ok, message, err }}
  let [sequence] = results
  return { ok, results: sequence ? sequence++ : INITIAL_COUNT + 1 }
}

function addRouters (router) {
  router.post('/certificate/save', async function (req, res) {
    const { connClass, body } = req
    const { ok, results: sequence, message, err } = await getSequence(connClass)
    if (!ok) {return res.send({ ok, message, err })}
    const { projectBucketCollection: collection } = connClass
    const id = String(sequence)
    const data = await collection.insert(`CERTIFICATE|${id}`, { ...body, type: 'CERTIFICATE' })
    res.send({ ok: true, results: { id, data } })
  })
}

export default {
  addRouters,
}
