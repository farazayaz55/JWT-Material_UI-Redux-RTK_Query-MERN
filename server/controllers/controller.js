const Model=require("../model/model")
const controller={
    getlists:async (req,res)=>{
        //get all the lists where req.user.id matches
        try{
            const lists=await Model.find({userID:req.user.id})
            
            if(lists.length>0)
            {
                res.json(lists)
            }
            else
            {   
                res.json([])
            }
        }
        catch(error)
        {
            res.json(error)
        }
        
    },
    add:async (req,res)=>{
        //add a list to db
        try{
            const newList = new Model({
                name:req.body.name, userID:req.user.id
            })//creation of new user

            // Save mongodb
            await newList.save()

            res.json({newList})
        }
        catch(error){
            res.json({error})
        }
    },
    delete:async (req,res)=>{
        try{
            const id=req.body.id
            const task=await Model.findByIdAndDelete(id)
            res.json({msg:"deleted"})
        }
        catch(error){
            res.json(error)
        }
    },
    update:async (req,res)=>{
        try
        {
            const id=req.body.id
            const task=await Model.findById(id)
            const taskupdate=await Model.findByIdAndUpdate(id,{completed:!task.completed})
            res.json(taskupdate)
        }
        catch(error)
        {
            res.json(error)
        }
    }
}

module.exports=controller