require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.get( '/', (req, res) => {
        res.json({ message: "Welcome to Wordllban application." });
})

const tourRoutes = require("./routes/tour.routes");

app.use('/tours', tourRoutes);

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
});
