'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StudentSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Student', StudentSchema);
