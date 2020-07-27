module.exports = () => {
    const express = require('express')
    const router = express()
    


    router.post('/products', (req, res) => {
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


}