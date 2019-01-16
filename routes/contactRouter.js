const express = require('express')
const Contact = require('../models/contacts')

const contactRouter = express.Router();

contactRouter
    .get('/', (req,res) => {
        Contact.find({}, (err, data) => {
            if (err){
                return res.status(400).json(err)
            }
            res.status(200).json(data)
        })
    }) 

contactRouter
    .post('/', (req, res) => {
        let contact = new Contact(req.body)
        contact.save((err, contact) => {
            if (err){
                return res.status(400).json(err)
            }
            res.status(200).json(contact)
        })
    })

contactRouter 
    .delete('/:id', (req, res) => {
        Contact.findByIdAndDelete(req.params.id, (err, data) => {
            if (err){
                return res.status(400).json(err)
            }
            res.status(204).json(data)
        })
    })

module.exports.contactRouter = contactRouter