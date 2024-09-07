const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');
const { expect } = require('@jest/globals');
const contactRoutes = require('../routes/contactRoutes');
const Contact = require('../models/contacts');

const app = express();
app.use(express.json());
app.use('/contacts', contactRoutes);

const sequelize = new Sequelize('sqlite::memory:', {
  logging: false,
});

beforeAll(async () => {
  await sequelize.sync();
});

jest.mock('../models/contacts.js', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  save: jest.fn(),
  destroy: jest.fn(),
}));

describe('Contact Routes Test', () => {
  it('should create a contact in database', async () => {
    const res = await request(app)
      .post('/contacts/createContact')
      .send({
        id : '10',
        first_name: 'Jinny',
        last_name: 'Dhul',
        email: 'jinny@example.com',
        mobile_number: '1234567890',
        data_store: 'DATABASE',
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should create a contact in the database', async () => {
    Contact.create.mockResolvedValue({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      mobile_number: '1234567890',
    });

    const res = await request(app)
      .post('/contacts/createContact')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        mobile_number: '1234567890',
        data_store: 'DB',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should fetch a contact from the database', async () => {
    Contact.findByPk.mockResolvedValue({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      mobile_number: '1234567890',
    });

    const res = await request(app)
      .post('/contacts/getContact')
      .send({
        contact_id: 1,
        data_store: 'DB',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should update a contact in the database', async () => {
    const mockContact = {
      id: 1,
      first_name: 'Rick',
      last_name: 'Doe',
      email: 'rick@example.com',
      mobile_number: '1234567890',
      save: jest.fn().mockResolvedValue(true),
    };

    Contact.findByPk.mockResolvedValue(mockContact);

    const res = await request(app)
      .post('/contacts/updateContact')
      .send({
        contact_id: 1,
        new_email: 'newemail@example.com',
        new_mobile_number: '9876543210',
        data_store: 'DB',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'newemail@example.com');
  });

  it('should delete a contact from the database', async () => {
    const mockContact = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    Contact.findByPk.mockResolvedValue(mockContact);

    const res = await request(app)
      .post('/contacts/deleteContact')
      .send({
        contact_id: 3,
        data_store: 'DB',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Contact deleted from Database');
  });
});
