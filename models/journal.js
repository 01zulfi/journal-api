const mongoose = require('mongoose');

const { Schema } = mongoose;

const JournalSchema = new Schema(
  {
    title: { type: String, required: true },
    urlName: { type: String },
    content: { type: String },
    date: { type: String },
    publish: { type: Boolean, required: true },
    author: { type: Schema.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Journal', JournalSchema);
