const express = require('express')
const Contact = require('../models/contacts')

const contactRouter = express.Router()

contactRouter
    .get('/', (req,res) => {
        const searchText = req.query.searchText
        const sort = req.query.sortType && req.query.sortDirection ? {[req.query.sortType] : req.query.sortDirection} : {'name.first': 1}
        const paginationOptions = {
            sort,
            offset: (req.query.page) * 10, 
            limit: 10
          };

        let queryObj = {}

        if(searchText) {
            const searchObj = {$regex: searchText, $options: 'i'}
            queryObj = {$or:[
                {'name.first': searchObj},
                {'name.last': searchObj},
                {'location.street': searchObj},
                {'cell': searchObj}
            ]}
        }

        Contact.paginate(queryObj, paginationOptions).then((data, err) => {
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