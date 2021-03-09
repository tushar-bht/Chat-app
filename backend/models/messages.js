const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "user" },
  content: {
    type: String,
    required: true,
  },
  room: { type: Schema.Types.ObjectId, ref: "room" },
});

module.exports = model("message", messageSchema);
