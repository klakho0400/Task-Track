const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userassigned:{
        type: String,
        required: true,
    },
    taskname:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
    dateCreated:{
        type: Date,
        required: true,
    },

    dateDeadline:{
        type: Date,
        required: true,
    },

    tag:{
        type: [String],
        required: true,
    },
    
},{
    timestamps: true,
});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;