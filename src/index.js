const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const { uuid } = require('uuidv4');

const app = express()

const config = require('./config/config')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const Products = require("./models/product-model")

mongoose.Promise = global.Promise
mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))



app.get('/products', (req, res) => {
  Products.find({}, 'title desc price brand img ', (err, products) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ products: products })
    }
  }).sort({ _id: -1 })
})

app.post('/products', (req, res) => {
  const product = new Products({
    title: req.body.title,
    desc: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    img: `img/shop/${req.body.brand}/${req.body.img}`
  })
  product.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: `Product with ID_${data._id} saved successfully!`
      })
    }
  })
})




app.post("/auth", (req, res) => {
  // console.log(req.body)

  const token = uuid();
  res.send({
    success: true,
    token: token
  })

})