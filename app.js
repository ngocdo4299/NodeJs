import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './routes/userRoute.js';
import products from './routes/productRoute.js';
import category from './routes/categoryRoute.js';
import orders from './routes/orderRoute.js';
import { verifyRequest } from './middleware/verifyRequest.js';


dotenv.config({
  path: '.env',
});
const app = express();

mongoose
  .connect('mongodb://localhost/sales', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB Connected!'));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(verifyRequest);
app.use('/api', [users, products, category, orders]);

const expressPort = process.env.PORT || 3000;
app.listen(expressPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Node server is running on port: ${expressPort}`);
});
