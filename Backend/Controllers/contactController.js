const Contact = require('../model/Contact');

const createContact = async (req, res) => {
  try {
      const { contactdate, fullname, contactno, emailid, details } = req.body;
      const newContact = new Contact({ contactdate, fullname, contactno, emailid, details });
      await newContact.save();
      res.status(201).json(newContact);
  } catch (error) {
      console.error('Error creating contact:', error);  // Log the actual error
      res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {createContact};