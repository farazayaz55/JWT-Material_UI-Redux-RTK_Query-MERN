const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({ 
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("usersList", taskSchema);//first param is the name of table