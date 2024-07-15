import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();
categoryRouter.get('/', expressAsyncHandler(getCategories));

export default categoryRouter