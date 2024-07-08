import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    if (products) 
        res.send(products);
    else
        return res.status(404).send({ message: 'Products Not Found' });
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: 'Product ID Not Found' });
};

export const getProductByToken = async (req, res) => {
    const product = await Product.findOne({token: req.params.token});
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: 'Product Token Not Found' });
};

export const updateProductQuantity = async (req, res) => {
    const newProduct = req.params.product;
    const product = await Product.findById(newProduct);
    if (product) {
        product.countInStock = newProduct.countInStock;
        await product.save();
        res.send({ message: 'Product Updated', data: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
};