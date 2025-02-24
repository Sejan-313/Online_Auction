const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  contactdate: {
    type: Date,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  contactno: {
    type: Number,
    required: true,
    unique: true,
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports=mongoose.model("Contact",userSchema)
