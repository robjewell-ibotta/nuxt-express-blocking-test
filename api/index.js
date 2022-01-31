const express = require('express')

// Create express instance
const app = express()

// Require API routes
const users = require('./routes/users')
const test = require('./routes/test')

app.get('/health', (_req, res) => {
  res.json({
    healthy: true
  })
})

// Import API Routes
app.use(users)
app.use(test)

// Start standalone server if directly running
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${port}`)
})

// Export express app
module.exports = app

