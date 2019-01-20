const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

toLower = string => string.toLowerCase()

/* The schema has more data than what we show on the client to support future enhancements */

const nameSchema = new mongoose.Schema({
  title: { type: String, set: toLower } ,
  first: { type: String, set: toLower } ,
  last: { type: String, set: toLower } 
})

const locationSchema = new mongoose.Schema({
  street: { type: String, set: toLower } ,
  city: { type: String, set: toLower } ,
  state: { type: String, set: toLower } ,
  postcode: { type: String, set: toLower } ,
  coordinates:{
    latitude: Number,
    longitude: Number
  }
})

const pictureSchema = new mongoose.Schema({
  large: { type: String, set: toLower } ,
  medium: { type: String, set: toLower } ,
  thumbnail: { type: String, set: toLower } 
})

const contactSchema = new mongoose.Schema({
  name: [nameSchema],
  location: [locationSchema],
  cell: { type: String, set: toLower } ,
  picture: [pictureSchema],
  createdOn: { type: Date, default: Date.now}
})

contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', contactSchema)
