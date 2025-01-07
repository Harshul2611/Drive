const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");

dotenv.config();
connectToDb();

app.set("view-engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3100, () => {
  console.log("Server is listening at port 3100");
});
