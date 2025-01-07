const express = require("express");
const { ExpressValidator } = require("express-validator");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post(
  "/register",
  body("username")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be minimum 3 words needed"),
  body("email").isEmail().trim().withMessage("Write valid email address"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Minimum 6 characters needed"),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array(), message: "Invalid Data" });
    }

    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Enter valid password"),
  body("password").trim().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array(), message: "Invalid Data" });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalaid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.send("Logged In");
  }
);

module.exports = router;
