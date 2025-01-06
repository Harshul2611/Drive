const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  //const { username, email, password } = req.body;
  res.send("User Registered");
});

module.exports = router;
