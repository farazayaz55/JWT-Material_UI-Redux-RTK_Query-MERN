const router=require('express').Router()
const controller=require("../controllers/authController")

router.post("/login",controller.login)
router.post("/register",controller.register)

router.get('/logout', controller.logout)

router.get('/refresh_token', controller.refreshToken)

module.exports=router