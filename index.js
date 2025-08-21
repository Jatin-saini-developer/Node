const express = require("express");
const User = require("./modal/user");
const connectDB = require("./database/mongoDb");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const obj = new User({
      firstName,
      lastName,
      password: passwordHash,
      email,
    });

    await obj.save();
    res.send("Server is Started");
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).send("Signup error: " + err.message);
  }
});

connectDB()
  .then(() => {
    app.listen(7777);
  })
  .catch(() => {
    console.error("DataBase is not connected");
  });
