import axios from 'axios';

const { Router } = require('express')

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

const createAxiosClient = (options = {}) => {

  return axios.create({
    timeout: 10000,
    ...options
  })
}

/* GET users listing. */
router.get('/users/suggestions', async function (req, res, next) {
  const client = createAxiosClient()
  console.log('requesting suggestions....')
  const response = await client({
    data: {offerTerms: 'test12', upcs: ['test']},
    method: 'post',
    baseURL: "https://4fdb-72-68-169-70.ngrok.io/suggestions"
  })

  res.json({
    message: response.data
  })
})

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
