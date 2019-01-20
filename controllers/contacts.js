const Contact = require('../models/contacts')

exports.getContacts = (req,res) => {
  const searchText = req.query.searchText
  const sort = req.query.sortType && req.query.sortDirection ? {[req.query.sortType] : req.query.sortDirection} : {'name.first': 1}
  const paginationOptions = {
      sort,
      offset: (req.query.page) * 100, 
      limit: 100
    };

  let queryObj = {}

/* Search text will search for a regex match in all the fields we show the client (first and last name, cellphone and street)  */

  if(searchText) {
      const searchObj = {$regex: searchText, $options: 'i'}
      queryObj = {$or:[
          {'name.first': searchObj},
          {'name.last': searchObj},
          {'location.street': searchObj},
          {'cell': searchObj}
      ]}
  }

  Contact.paginate(queryObj, paginationOptions).then(
      (data, err) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
   })
}

exports.createContact = (req, res) => {
  const contact = new Contact(req.body)
  contact.save((err, data) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
  })
}

exports.updateContact = (req, res) => {
  const contact = new Contact(req.body)
  Contact.findByIdAndUpdate(req.params.id, contact, (err, data) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
  })
}

exports.deleteContact = (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (err, data) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
  })
}