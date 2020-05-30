const express = require("express");
const mongoose = require("mongoose");
const verify = require("./routes/verify");
const cors = require("cors");
require("dotenv/config");
const app = express();

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(cors());
app.use(express.json());
//import routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
//middleware

app.use("/api/user", authRoute);
app.use("/api/posts", verify, postsRoute);

//routes
app.get("/", (req, res) => {
  res.send("HOme is here");
});

//connect to DB
// mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },

  () => console.log("Server is running")
);

app.listen(4000);
