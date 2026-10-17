const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    forName: { type: String, required: true },
    toName: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = model("Contact", messageSchema);