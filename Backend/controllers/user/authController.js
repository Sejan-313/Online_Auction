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

const register = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    console.log(req.body);
    
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    try {
      const { password, ...otherData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new User({ ...otherData, password: hashedPassword, image: req.file.filename });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  });
};

const updateUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    try {
      const userId = req.user.id;
      const updateData = { ...req.body };
      if (req.file) updateData.image = req.file.filename;

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      
      res.status(200).json({ 
        message: "User updated successfully", 
        user: {
          email: updatedUser.email,
          fullName: updatedUser.fullName,
          role: "user"
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ success: true, message: "Login successful", token, user_id: user._id, email: user.email,fullName: user.fullName, role: "user" });

  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
      const { old_password, new_password } = req.body;
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(old_password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

      if (old_password === new_password) return res.status(400).json({ message: "New password cannot be the same as old password" });

      const hashedPassword = await bcrypt.hash(new_password, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error changing password", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
      const userId = req.params.id; 
      const user = await User.findById(userId)
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
}

const getUserAll = async (req, res) => {
  try {  
    const user = await User.find(); 
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);  
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { register, login ,getUser, getUserAll, getUserById, updateUser, changePassword };





