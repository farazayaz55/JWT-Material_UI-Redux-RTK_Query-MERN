// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fmiddleware-in-express-js%2F&psig=AOvVaw1jH1VMh-RK2nQrKjZO5ai5&ust=1669735302101000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjKv_CW0fsCFQAAAAAdAAAAABAJ
const jwt = require('jsonwebtoken')
ACCESS_TOKEN_SECRET = "y!jZRXJEgEGXaC(ErjZmMp4+AjbG2S&k9@ytSZBt"

REFRESH_TOKEN_SECRET = "jk%5Y2s6&bT$muk)c%NXy(NyZGM8juTXc%(&Fn42DYR4IeT)Ky"
const User=require("../model/userModel")
const auth = async (req, res, next) =>{
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
  
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        res.status(403).json({"msg":"not authorized"})
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
}

module.exports = auth