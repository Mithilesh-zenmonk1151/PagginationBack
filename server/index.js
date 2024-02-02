const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require("./config/db")
const router = require("./router/user")


require("dotenv").config();

const PORT= process.env.PORT || 5000;




app.use(express.json());
app.use(cors());
mongoose.connect();


app.use('/api/users', router);



app.listen(PORT, () => {
    console.log(`Listen on ${PORT} port`);
});