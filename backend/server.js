import dotebv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';

dotebv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use((err,req, res, next) => {
  res.status(500).send({message: err.message});
})

//not found handler

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to MongoDB || server running on port ${PORT}`);
  });
})
.catch((err) => console.log(err));