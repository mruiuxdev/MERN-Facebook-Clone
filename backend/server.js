const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { default: mongoose } = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());
// let allowed = ["http://localhost:3000", "another link"];

// function options(req, res) {
//   let tmp;

//   let origin = req.header("Origin");

//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       optionsSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: "stupid",
//     };
//   }

//   res(null, tmp);
// }
app.use(
  cors()
  //options
);

readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
