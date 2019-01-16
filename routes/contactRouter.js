const express = require('express')
const Contact = require('../models/contacts')

const contactRouter = express.Router();

contactRouter
    .get('/', (req,res) => {
        Contact.find({}, (err, contacts) => {
            if (err){
                return res.status(400).json(err)
            }
            res.status(200).json(contacts)
        })
    }) 

contactRouter
    .post('/', (req, res) =>{
        let contact = new Contact(req.body)
        contact.save((err, contact) => {
            if (err){
                return res.status(400).json(err)
            }
            res.status(200).json(contact)
        })
    })

module.exports.contactRouter = contactRouter