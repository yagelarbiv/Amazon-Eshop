import mongoode from "mongoose";
const productSchema = new mongoode.Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    countInStock: { type: Number, required: true },
    token: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    rating:{
      rate: {type: Number},
      count: {type: Number}
    },
  },
  { timestamps: true }
);
const Product = mongoode.model("Product", productSchema);
export default Product;