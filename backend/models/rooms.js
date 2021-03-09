const { Schema, model } = require("mongoose");

const roomsSchema = new Schema({
  roomCreator: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: String, required: true },
  roomMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

module.exports = model("room", roomsSchema);
