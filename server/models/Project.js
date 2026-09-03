const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  techTags: {
    type: [String],
    default: []
  },
  liveLink: {
    type: String
  },
  githubLink: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);