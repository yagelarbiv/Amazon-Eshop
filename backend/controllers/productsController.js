import { title } from "process";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  if (products) res.send(products);
  else return res.status(404).send({ message: "Products Not Found" });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.send(product);
  else res.status(404).send({ message: "Product ID Not Found" });
};

export const getProductByToken = async (req, res) => {
  const product = await Product.findOne({ token: req.params.token });
  if (product) res.send(product);
  else res.status(404).send({ message: "Product Token Not Found" });
};

export const updateProductQuantity = async (req, res) => {
  const newProduct = req.params.product;
  const product = await Product.findById(newProduct);
  if (product) {
    product.countInStock = newProduct.countInStock;
    await product.save();
    res.send({ message: "Product Updated", data: updatedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const getProductByQuery = async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || process.env.PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const queryFilter =
    searchQuery && searchQuery !== "all"
        ? {
            title: {
                $regex: searchQuery,
                $options: "i",
            }
        }
        : {};
    const categoryFilter = category && category !== "all" ? {
      category 
    } : {};
    const ratingFilter = rating && rating !== "all" ? {
      'rating.rate':{ $gte: Number(rating) } 
    } : {};
    const priceFilter = 
    price && price !== "all" ? 
    { 
        price: { 
            $gte: Number(price.split("-")[0]), 
            $lte: Number(price.split("-")[1]) 
        } 
    } : {};

    const sortOrder =
    order === "lowest"
        ? { price : 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({ 
        ...queryFilter, 
        ...categoryFilter, 
        ...priceFilter, 
        ...ratingFilter })
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    const countProducts = await Product.countDocuments({ 
        ...queryFilter, 
        ...categoryFilter, 
        ...priceFilter, 
        ...ratingFilter });

    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
    });

};