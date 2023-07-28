const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },

    rating:{
        type: Number,
        required: true,
    },

    email:{
        type:String,
        required: true,
    },

    phone:{
        type:String,
        required: true,
    },

    taskComplete: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
    taskIncomplete: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],

},{
    timestamps: true,
});

const User = mongoose.model('User',userSchema);
module.exports = User;