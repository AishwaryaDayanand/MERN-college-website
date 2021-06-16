const express = require("express");
const router = express.Router();
const User = require("../databaseModels/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, semester, email, mobile, interest, password, passwordAgain } =
      req.body;
    const userExist = await User.findOne({ mobile }); // checking for existing users
    //function to create new user along with hashing password usign bcryptjs package
    const createUser = async () => {
      const salt = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, salt); //password hashed

      //new user creating
      const newUser = new User({
        name,
        semester,
        email,
        interest,
        mobile,
        passwordHashed,
      });
      const createdUser = await newUser.save();

      //token generation

      const token = jwt.sign(
        {
          userId: createdUser._id,
        },
        "secret password"
      );
      return token;
    };

    //validations for entries
    if (
      !name ||
      !semester ||
      !email ||
      !mobile ||
      !interest ||
      !password ||
      !passwordAgain
    ) {
      return res.json({ msg: "please enter all the fields", added: false });
    } else if (userExist) {
      return res.status(200).json({
        msg: "Account already exist with this mobile number",
        added: false,
      });
    } else if (password.length < 8) {
      return res.status(200).json({
        msg: "Password is short, enter minimum 8 characters",
        added: false,
      });
    } else if (password !== passwordAgain) {
      return res.json({ msg: "passwords Don't match", added: false });
    } else if (semester < 1 || semester > 8) {
      return res.json({ msg: "please enter valid semester", added: false });
    }
    //if no validation error user is being created by calling createUser function
    else {
      const token = await createUser();
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ msg: "account Created", added: true });
    }
  } catch (err) {
    //if any internal error occured this msg is sent to frontend
    console.error(err);
    res.json({ msg: "sorry for inconvinience, try again later" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email: email }); //check if user exists
    if (!existUser) {
      return res.json({ msg: "user does not exist", added: false }); //if user not exist then send response msg
    }
    const pwdCorrect = await bcrypt.compare(password, existUser.passwordHashed); //verify password--if hashed password is generated using provided pwd --returns true/false
    if (!pwdCorrect) {
      return res.json({ msg: "incorrect email or password", added: false }); //if password wrong
    }

    const createToken = async () => {
      const token = await jwt.sign(
        //if pwd user authonticated , send token again to browser
        { userId: existUser._id },
        "secret password"
      );
      return token;
    };
    const token = await createToken();
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ msg: "logged in successfully", added: true });
  } catch (err) {
    console.error(err);
    res.json({ msg: "sorry for inconvinience, try again later", added: false });
  }
});

router.get("/logout", (req, res) => {
  //when logged out , send empty token , so user will be unauthenticated
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .status(200)
    .json({ msg: "logged out" });
});

router.get("/loggedin", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ isLoggedIn: false, userName: "unauthorized" });
    }
    const verified = await jwt.verify(token, "secret password");
    const userName = await User.findOne({ _id: verified.userId }).select({
      name: 1,
      _id: 0,
    });
    if (verified) {
      return res.json({ isLoggedIn: true, userName: userName.name });
    } else {
      return res.json({ isLoggedIn: false, userName: "unauthorized" });
    }
  } catch (err) {
    res.json({ isLoggedIn: false, userName: "unauthorized" });
  }
});

router.post("/find", async (req, res) => {
  try {
    let users;
    const { interest } = req.body;
    if (interest == "all") {
      users = await User.find();
    } else {
      users = await User.find({ interest: interest });
    }
    if (users.length < 1) {
      return res.status(200).json({ msg: "no user found", users: users });
    }
    res.status(200).json({ msg: "users recieved", users: users });
  } catch (err) {
    res
      .status(200)
      .json({ msg: "sorry for inconvinience,try again later ", users });
  }
});

module.exports = router;
