const express = require("express");
const User = require("./db.js"); // Assuming you've changed the schema to include additional fields and renamed the collection to 'User'
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
  // Handle GET requests if needed
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, name, phoneNumber, city, pincode } = req.body; // Include additional fields

  const userData = {
    email: email,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
    city: city,
    pincode: pincode
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await User.create(userData); // Insert user data directly

      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(9000, () => {
  console.log("port connected");
});