const request = require('supertest');
const express = require('express');
const contactRoutes = require('../routes/contactRoutes'); // Adjust path based on your structure

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/contacts', contactRoutes);

describe('Contact Routes Test', () => {

  it('should create a contact in CRM', async () => {
    const res = await request(app)
      .post('/contacts/createContact')
      .send({
        first_name: "Jina",
        last_name: "Dima",
        email: "jina@example.com",
        mobile_number: "1234567896",
        data_store: "CRM"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('contact');
  });

  it('should get a contact from CRM', async () => {
    const res = await request(app)
      .post('/contacts/getContact')
      .send({
        contact_id: 402097051249,
        data_store: "CRM"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('contact');
  });

  it('should update a contact in CRM', async () => {
    const res = await request(app)
      .post('/contacts/updateContact')
      .send({
        contact_id: 402097051249,
        new_email: "updatedemail@example.com",
        new_mobile_number: "9828468213",
        data_store: "CRM"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('contact');
  });

  it('should delete a contact from CRM', async () => {
    const res = await request(app)
      .post('/contacts/deleteContact')
      .send({
        contact_id: 402097051377,
        data_store: "CRM"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Contact deleted from CRM');
  });

});
