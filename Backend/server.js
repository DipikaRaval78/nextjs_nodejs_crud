const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const routes = require("./routes/authRoutes");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
//middleware

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true })); // using Body Parsing Middleware for multer --postman---formdata sending
// app.use('/public', express.static('public/ProductImages'));
app.use(
  "/public/ProductImages",
  express.static(path.join(__dirname, "public/ProductImages"))
);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.get("/set-cookie", (req, res) => {
  // Set the cookie with SameSite=None and Secure attribute
  res.cookie("token", "value", { sameSite: "None", secure: true });
  res.send("Cookie set successfully");
});
// app.use(express.static('public'))// access for public folder

// app.use('/public', express.static('ProductImages'));
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
//         console.log('Successfully connected to the mongoDB Atlas!')
//     }).catch((error)=>{
//         console.log('impossible to connect to the mondoDB Atlas !')
//         console.error(error);
//     });
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB_Connected....");
} catch (error) {
  console.log(error);
}
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});
