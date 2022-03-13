const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  dob: Number,
});

module.exports = mongoose.model('Author', authorSchema);
