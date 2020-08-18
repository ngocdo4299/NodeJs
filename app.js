import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import  dotenv from 'dotenv';
import { router as users} from './routes/userRoute.js';
import { router as products} from './routes/productRoute.js';
import { router as category} from './routes/categoryRoute.js';
import { router as orders} from './routes/orderRoute.js';


dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost/sales", { useNewUrlParser: true })
  .then(() => console.log("DB Connected!"));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/category", category);
app.use("/api/orders", orders);

app.listen(process.env.port, function () {
  console.log("Node server is running on port: "+process.env.port);
});
export {app};
