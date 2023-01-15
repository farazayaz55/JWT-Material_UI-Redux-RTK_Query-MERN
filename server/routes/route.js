const router=require('express').Router()
const controller=require("../controllers/controller")
const middleware=require("../middleWare/authMiddleware")
router.get("/",middleware,controller.getlists)
router.post("/",middleware,controller.add)
router.patch("/",middleware,controller.update)
router.delete("/",middleware,controller.delete)

module.exports=router