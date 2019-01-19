const Contact = require('../models/contacts')

exports.get_contacts = (req,res) => {
  const searchText = req.query.searchText
  const sort = req.query.sortType && req.query.sortDirection ? {[req.query.sortType] : req.query.sortDirection} : {'name.first': 1}
  const paginationOptions = {
      sort,
      offset: (req.query.page) * 100, 
      limit: 100
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
}

exports.create_contact = (req, res) => {
  const contact = new Contact(req.body)
  contact.save((err, contact) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(contact)
  })
}

exports.update_contact = (req, res) => {
  const contact = new Contact(req.body)
  Contact.findByIdAndUpdate(req.params.id, contact, (err, data) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
  })
}

exports.delete_contact = (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (err, data) => {
      if (err){
          return res.status(400).json(err)
      }
      res.status(200).json(data)
  })
}