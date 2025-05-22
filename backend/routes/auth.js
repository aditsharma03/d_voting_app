const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const faceapi = require("face-api.js")






const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

//Creates a new user after various validations (Route no 1)Login isn't req
router.post( "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry , a user with this email already exists" });
      }

      //Produce secure password(hashed)
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);


      //New user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        faceDescriptor: req.body.descriptor,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } 
    catch (error) {
      res.status(500).send(error);
    }
  },
);

//Authenticate a user during login(route no 2)Login isn't req
router.post( "/signin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password  } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res .status(400) .json({ error: "Please try to Login with correct credentials" });
      }


      const passcompare = await bcrypt.compare(password, user.password);

      //Compare Face Descriptors
      //const faceMatcher = new faceapi.FaceMatcher(descriptor);

      //Promise.all([
      //  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      //  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      //  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      //]).then(() => {
      //        const match = faceMatcher.findBestMatch(user.faceDescriptor.descriptor);
      //        console.log(match);
      //      })
      //      .catch((err) => console.log(err));

      if (!passcompare) {
        return res .status(400) .json({ error: "Please try to Login with correct credentials" });
      }


      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ 
        "authToken": authToken,
        "descriptor": user.faceDescriptor
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
);

//Route 3 to get the logged in user's details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
