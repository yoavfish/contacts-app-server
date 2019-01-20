const express = require('express')
const ContactsController = require('../controllers/contacts')
const contactRouter = express.Router()

contactRouter
    .get('/', ContactsController.getContacts)

contactRouter
    .post('/', ContactsController.createContact)

contactRouter 
    .put('/:id', ContactsController.updateContact)

contactRouter 
    .delete('/:id', ContactsController.deleteContact)

module.exports = contactRouter