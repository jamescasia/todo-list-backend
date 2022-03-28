const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    },
    expanded: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;