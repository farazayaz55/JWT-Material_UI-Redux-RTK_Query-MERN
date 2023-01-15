const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/FARAZ_REDUX",()=>console.log("DB is connected"));//the last one is db name

module.exports=mongoose;