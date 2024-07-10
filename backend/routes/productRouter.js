import express from "express";
import { getProducts, getProductById, getProductByToken, updateProductQuantity, getProductByCategories, getCategories } from "../controllers/productsController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get('/categories', expressAsyncHandler(getCategories));
productRouter.get('/search', expressAsyncHandler(getProductByCategories));
productRouter.get("/update/:product", expressAsyncHandler(updateProductQuantity));
productRouter.get("/:id", expressAsyncHandler(getProductById));
productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));
productRouter.get("/", expressAsyncHandler(getProducts));

export default productRouter;