const Seller = require("../../models/seller/sellerModel");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/seller/",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
}).single("image");

const registerSeller = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    try {
      const { password, ...otherData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new Seller({ ...otherData, password: hashedPassword, image: req.file.filename });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  });
};

const loginSellerr = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await Seller.findOne({ email });

      if (!user) return res.status(400).json({ success: false, message: "Seller not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });


      res.json({ success: true, message: "Login successful", token, seller_id: user._id, email: user.email, fullName: user.fullName, role: "seller" });


  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = { registerSeller, loginSellerr };

