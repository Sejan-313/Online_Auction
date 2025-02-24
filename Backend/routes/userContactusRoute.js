const express = require('express');
const router = express.Router();
const {createContact} = require("../Controllers/contactController");


router.post('/', createContact);

module.exports = router;