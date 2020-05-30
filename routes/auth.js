const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/validation");

// validation

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate input
    const error = await registerValidation(req.body);
    if (error) throw error;

    //check if email exists
    const emailExists = User.find({ email });

    if (emailExists) throw "Email already exists";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      hashedPassword,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    if (error.details) {
      res.status(400).send({ message: error.details[0].message });
    } else {
      res.status(400).send({ message: error });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //validate input

  const error = loginValidation(req.body);
  if (error) throw error;

  //check if user email exists

  const user = await User.find({ email });
  if (user) throw "Email or password incorrect";
  //check if passwords match

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw "Email or password incorrect";

  //create jwttoken
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);
  try {
  } catch (error) {}
});

module.exports = router;

//validate input
//   const { error } = schema.validate(req.body, schema);
//   const error = await registerValidation(req.body);
//   res.send(error);
//   console.log("Finall", error);

//   try {
//     // const { error } = await schema.validateAsync(req.body);
//     // const error = await registerValidation(req.body);
//     // console.log(error);
//     // if (error) throw error;

//     const { name, email, password } = req.body;
//     //check if email exists
//     // const emailExist = await User.findOne({ email });
//     // res.send(emailExist);
//     // console.log("hey", emailExist);
//     // if (emailExist) throw "Email already exists";
//     const user = new User({
//       name,
//       email,
//       password,
//     });

//     // console.log(user);
//     const newUser = await user.save();
//     // console.log(newUser);z
//     res.send(newUser);
//   } catch (error) {
//     if (error.details) {
//       res.status(400).send({ message: error.details[0].message });
//     } else {
//       res.status(400).send({ message: error });
//     }
//   }
