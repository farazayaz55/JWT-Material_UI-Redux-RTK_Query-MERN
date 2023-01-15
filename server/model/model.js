const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'usersList',
    }
});
module.exports = mongoose.model("todoList", taskSchema);//first param is the name of table