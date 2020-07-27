const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

const config = require('./config/config')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const Products = require("./models/product-model")

// app.use(require('./routes/products'))




mongoose.Promise = global.Promise
mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
        () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))
  


/*********/
app.get('/products', (req, res) => {
    Products.find({}, 'title desc price brand img ', (err, products) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ products: products })
      }
    }).sort({ _id: -1 })
  })  
/***********/
// app.get('/products', (req, res) => {
//     res.send(
//         [

//             {
//                 id: 1,
//                 title: 'Paul Rich v1',
//                 price: 3200,
//                 desc: "Fully descriprion for PRv1",
//                 img: "img/shop/paul-rich/v1.jpg",
//                 brand: 'Paul Rich'
//             },
//             {
//                 id: 2,
//                 title: 'Rolex Aquamarine',
//                 price: 320000,
//                 desc: "Fully descriprion for Rolex",
//                 img: "img/shop/rolex/rolex.jpg",
//                 brand: "Rolex"
//             },

//             {
//                 id: 3,
//                 title: 'Rolex  2',
//                 price: 3200000,
//                 desc: "Fully descriprion for Rolex",
//                 img: "img/shop/rolex/rolex.jpg",
//                 brand: "Rolex"
//             }

//         ]
//     )
// })


/**********/

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