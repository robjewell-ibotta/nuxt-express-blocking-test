import express from 'express'
import axios from 'axios'

// Require API routes
import users from './routes/users'
import test from './routes/test'

// Create express instance
const app = express()

const createAxiosClient = (options = {}) => {

  return axios.create({
    timeout: 10000,
    ...options
  })
}

(async () => {

  const client = createAxiosClient()

  await client({
    method: 'get',
    baseURL: 'https://a4db-72-68-169-70.ngrok.io'
  })

  app.get('/health', (_req, res) => {
    res.json({
      healthy: true
    })
  })

  // Import API Routes
  app.use(users)
  app.use(test)

  app.use((err, req, res, _next) => {

    console.log('error')
    console.log(err)
  })

})()

// Export express app
export default app

// Start standalone server if directly running
// if (require.main === module) {
//   const port = 3000
//   app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`API server listening on port ${port}`)
//   })
// }
