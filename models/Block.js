const mongoose = require("./index");
const { Schema } = mongoose;

const blockSchema = new Schema({
  timeStamp: Number, 
  data: String, 
  hash: String, 
  previous: {
    type: String, 
    default: null
  },
  next: {
    type: String, 
    default: null
  }, 
  completed: {
    type: Boolean,
    default: false
  }
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;