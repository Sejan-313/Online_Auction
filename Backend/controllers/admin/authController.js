const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/AdminModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Admin not found" });

    if (user.password !== password) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      message: "Login successful",
      admin_id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: "admin",
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { login };
