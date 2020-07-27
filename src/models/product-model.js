const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const ProductSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    img: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
})

const ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel