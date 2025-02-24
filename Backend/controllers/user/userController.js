const User = require("../../models/user/userModel");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/user/",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
}).single("image");

const registerUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    try {
      const { password, ...otherData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 

      const newUser = new User({ ...otherData, password: hashedPassword, image: req.file.path });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", token, email: user.email, role: "user" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = { registerUser, loginUser };





