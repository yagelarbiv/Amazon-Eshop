import express from "express";
import { getProducts, getProductById, getProductByToken, updateProductQuantity, getProductByQuery } from "../controllers/productsController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get('/search', expressAsyncHandler(getProductByQuery));
productRouter.get("/update/:product", expressAsyncHandler(updateProductQuantity));
productRouter.get("/:id", expressAsyncHandler(getProductById));
productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));
productRouter.get("/", expressAsyncHandler(getProducts));

export default productRouter;