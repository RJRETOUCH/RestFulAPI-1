const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/model');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes

app.get('/', (req, res) => {
    res.send('This is Home Page')
})


app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.post('/product', async (req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a product

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `cannot find wtih an ID:${id}` })
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// delete Product
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://monukushwaha0909:8081412640@restapi1.pjkkkzg.mongodb.net/Rest-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log('Node API is running on port 3000');
        });

    }).catch((error) => {
        console.log(error);
    })