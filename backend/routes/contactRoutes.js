const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validation');

router.post('/', validateContactForm, sendContactEmail);

module.exports = router; 