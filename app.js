const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");

app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(3100, () => {
  console.log("Server is listening at port 3100");
});
