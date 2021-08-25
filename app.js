require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./routes/User");
const Cart = require("./routes/Cart");
const Admin = require("./routes/Admin");

const MONGODB_URI = process.env.__MONGO_URI__;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use("/user", User);
app.use('/cart',Cart);
app.use('/admin',Admin)

app.listen(PORT, (req, res) => {
  console.log(`Server Started at port ${PORT}`);
});
