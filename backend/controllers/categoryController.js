import Product from "../models/Product.js";

export const getCategories = async (req, res) => {
  const categories = await Product.find().distinct("category");
  if (categories) res.send(categories);
  else res.status(404).send({ message: "Categories Not Found" });
};