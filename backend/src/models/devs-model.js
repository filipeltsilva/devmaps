const mongoose = require('mongoose');
const pointSchema = require('./utils/point-schema');

const devsSchema = new mongoose.Schema({
  name: String,
  githubUsername: String,
  bio: String,
  avatarURL: String,
  techs: [String],
  location: {
    type: pointSchema,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('devs', devsSchema);
