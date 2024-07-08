import express from "express";
import { getProducts, getProductById, getProductByToken, updateProductQuantity } from "../controllers/productsController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get("/", expressAsyncHandler(getProducts));
productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));
productRouter.get("/:id", expressAsyncHandler(getProductById));
productRouter.get("/update/:product", expressAsyncHandler(updateProductQuantity));

export default productRouter;