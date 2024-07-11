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

export const getCategories = async (req, res) => {
    console.log("pulling Categories");
    const categories = await Product.find().distinct("category");
    if (categories) res.send(categories);
    else res.status(404).send({ message: "Categories Not Found" });
};

export const getProductByCategories = async (req, res) => {
    const searchParams = new URLSearchParams(req.query);
    let products = await Product.find({});
    let ProductsPerPage = 5;
    let productsInPage = [];
    let numberOfPages = Math.ceil(products.length / ProductsPerPage); 
    const currentPage = Number(searchParams.get("page")) || 1;

    if (currentPage > numberOfPages) {
        return res.status(404).send({ message: "Page Not Found" });
    };

    if (searchParams.get("category") && searchParams.get("category") !== "all") {
        products = products.filter(
        (x) => x.category === searchParams.get("category")
        );
    };

    if (searchParams.get("query") && searchParams.get("query") !== "all") {
        products = products.filter(
        (x) =>
            x.title.includes(searchParams.get("query"))
        );
    };

    if (searchParams.get("price") && searchParams.get("price") !== "all") {
        const prices = searchParams.get("price").split("-")
        products = products.filter(
        (x) => x.price >= prices[0] && x.price <= prices[1]
        );
    };

    if (searchParams.get("rating")  && searchParams.get("rating") !== "all") {
        products = products.filter(
        (x) => x.rating === parseInt(searchParams.get("rating"))
        );
    };

    if (searchParams.get("order")) {
        const order = searchParams.get("order");
        products = products.sort((a, b) =>
            order === "lowest"
            ? a.price > b.price
                ? 1
                : -1
            : order === "highest"
            ? a.price < b.price
                ? 1
                : -1
            : a._id < b._id
                ? 1
                : -1
        );
    };

    if (searchParams.get("page") && products.length > ProductsPerPage ) {
        const startIndex = (currentPage - 1) * ProductsPerPage;
        const endIndex = startIndex + ProductsPerPage;
        productsInPage = products.slice(startIndex, endIndex);
        numberOfPages = Math.ceil(products.length / ProductsPerPage);
    };

    if (products.length > 0) {
        res.send({products: productsInPage, pages: numberOfPages, page: currentPage, countProducts: products.length});
    } else {
        res.status(404).send({ message: "Products Not Found" });
    }
};
