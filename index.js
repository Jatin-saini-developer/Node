const express = require("express");
const User = require("./src/modal/user");
const connectDB = require("./src/database/mongoDb");
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


 app.post("/user", async (req, res) => {
  const user = new User({
    firstName: "Jatin",
    lastName: "Saini",
    email: "jatinrsaini@gmail.com",
    password: "jatin123",
  })

  await user.save()

 });



connectDB()
  .then(() => {
    app.listen(7777);
  })
  .catch(() => {
    console.error("DataBase is not connected");
  });
