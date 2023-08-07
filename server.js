const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./router/user.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());

app.use("/app/v1/users", userRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
