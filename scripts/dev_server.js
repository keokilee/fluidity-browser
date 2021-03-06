const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('../config/webpack.browser.babel')

const app = express()
const compiler = webpack(config)
const port = process.env.PORT || 4000

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'browser', 'index.html'))
})

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${port}`)
})
