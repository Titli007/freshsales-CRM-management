// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to create a contact
router.post('/createContact', contactController.createContact);

// Route to get a contact
router.post('/getContact', contactController.getContact);

// Route to update a contact
router.post('/updateContact', contactController.updateContact);

// Route to delete a contact
router.post('/deleteContact', contactController.deleteContact);

module.exports = router;
