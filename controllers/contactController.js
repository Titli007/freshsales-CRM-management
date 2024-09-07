// controllers/contactController.js
require('dotenv').config();
const axios = require('axios');
const Contact = require('../models/contacts.js')

const apiKey = process.env.FRESHSALES_API_KEY;
const domain = process.env.FRESHSALES_DOMAIN;;

// Create contact in either FreshSales or Database
exports.createContact = async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;
  
    try {
        
        if (data_store === 'CRM') {
            console.log("crm");
          
            try {
              // FreshSales API request to create contact
              const response = await axios.post(`${domain}/api/contacts`, {
                contact: { first_name, last_name, email, mobile_number }
              }, {
                headers: {
                  Authorization: `Token token=${apiKey}`,
                  'Content-Type': 'application/json'
                }
              });
          
              // Send success response
              res.json(response.data);
            } catch (error) {
              console.error("Error creating contact in FreshSales CRM:", error);
          
              // Send error response with status 500 (Internal Server Error)
              res.status(500).json({
                message: "Failed to create contact in FreshSales CRM.",
                error: error.message
              });
            }
          }

      else {
        console.log("db");
      
        try {
            console.log("db>try");
          // Create contact in the MySQL database
          const contact = await Contact.create({
            first_name,
            last_name,
            email,
            mobile_number
          });
      
          // Send success response
          res.json(contact);
        } catch (error) {
          console.error("Error creating contact in the database:", error);
      
          // Send error response with status 500 (Internal Server Error)
          res.status(500).json({
            message: "Failed to create contact in the database.",
            error: error.message
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  };
  
  // Get contact by ID from either FreshSales or Database
  exports.getContact = async (req, res) => {
    const { contact_id, data_store } = req.body;
  
    try {
        console.log("get>crm")
      if (data_store === 'CRM') {
        // FreshSales API request to get contact
        const response = await axios.get(`${domain}/api/contacts/${contact_id}`, {
          headers: {
            Authorization: `Token token=${apiKey}`,
          }
        });
        res.json(response.data);
      } else {
        console.log("get>db")
        // Get contact from the MySQL database
        const contact = await Contact.findByPk(contact_id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve contact' });
    }
  };
  
  // Update contact in either FreshSales or Database
  exports.updateContact = async (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;
  
    try {
      if (data_store === 'CRM') {
        // FreshSales API request to update contact
        const response = await axios.put(`${domain}/api/contacts/${contact_id}`, {
          contact: { email: new_email, mobile_number: new_mobile_number }
        }, {
          headers: {
            Authorization: `Token token=${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        res.json(response.data);
      } else {
        // Update contact in the MySQL database
        const contact = await Contact.findByPk(contact_id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
  
        contact.email = new_email;
        contact.mobile_number = new_mobile_number;
        await contact.save();
        res.json(contact);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update contact' });
    }
  };
  
  // Delete contact in either FreshSales or Database
  exports.deleteContact = async (req, res) => {
    const { contact_id, data_store } = req.body;
  
    try {
      if (data_store === 'CRM') {
        // FreshSales API request to delete contact
        await axios.delete(`${domain}/api/contacts/${contact_id}`, {
          headers: {
            Authorization: `Token token=${apiKey}`,
          }
        });
        res.json({ message: 'Contact deleted from CRM' });
      } else {
        // Delete contact from the MySQL database
        const contact = await Contact.findByPk(contact_id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
  
        await contact.destroy();
        res.json({ message: 'Contact deleted from Database' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  };