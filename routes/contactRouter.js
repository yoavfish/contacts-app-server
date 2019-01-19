const express = require('express')
const ContactsController = require('../controllers/contacts')
const contactRouter = express.Router()

contactRouter
    .get('/', ContactsController.get_contacts)

contactRouter
    .post('/', ContactsController.create_contact)

contactRouter 
    .put('/:id', ContactsController.update_contact)

contactRouter 
    .delete('/:id', ContactsController.delete_contact)

module.exports.contactRouter = contactRouter