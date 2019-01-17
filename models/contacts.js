const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const nameSchema = new mongoose.Schema({
  title: String,
  first: String,
  last: String
})

const locationSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postcode: String,
  coordinates:{
    latitude: Number,
    longitude: Number
  }
})

const pictureSchema = new mongoose.Schema({
  large: String,
  medium: String,
  thumbnail: String
})

const contactSchema = new mongoose.Schema({
  name: [nameSchema],
  location: [locationSchema],
  cell: String,
  picture: [pictureSchema],
  createdOn: { type: Date, default: Date.now}
})

contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', contactSchema)
