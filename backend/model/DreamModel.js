const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    url: String,
    description: String,
  }, { _id: false });
  
  const NodeSchema = new mongoose.Schema({
    id: String,
    title: String,
    x: Number,
    y: Number,
    type: String,
    color: String,
    userContent: Object,
    resources: [ResourceSchema],
  }, { _id: false });
  
  const ConnectionSchema = new mongoose.Schema({
    from: String,
    to: String,
  }, { _id: false });
  
  const roadmapSchema = new mongoose.Schema({
    roadmapId: {
      type: String,
      required: true,
      unique: true,
    },
    roadmap: {
      nodes: [NodeSchema],
      connections: [ConnectionSchema],
    },
    userInput: {
      type: Object,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Roadmap', roadmapSchema);
