const Users=require("../model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
ACCESS_TOKEN_SECRET = "y!jZRXJEgEGXaC(ErjZmMp4+AjbG2S&k9@ytSZBt"

REFRESH_TOKEN_SECRET = "jk%5Y2s6&bT$muk)c%NXy(NyZGM8juTXc%(&Fn42DYR4IeT)Ky"
const controller={
    login:async (req,res)=>{
        try{
            const {email,password}=req.body
            const user=await Users.findOne({email}) //mongoose all things are async
            if(!user) res.status(400).json({msg:"User does not exist"})
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch) res.status(400).json({msg:"Wrong Password!"})

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})//we make refresh tokens so that after some interval our access token expires and a new token is generated without logut

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                maxAge: 7*24*60*60*1000,
                path: '/auth/refresh_token', // 7d
                secure:false,
            })

            console.log(refreshtoken)
            // res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
            // res.set('Access-Control-Allow-Credentials', 'true')
            res.status(200).json({accesstoken,
                "id":user._id.toHexString()});
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }

    },
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })//creation of new user

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,//the link where the token will be refreshed and accessible
                maxAge: 7*24*60*60*1000, // 7d
                path: '/auth/refresh_token',
                secure:false,
            })

            console.log(refreshtoken)
                //made a session cookie etc and sent in the response
            res.json({accesstoken})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{//this is just refreshing token no need to understand it is mostly copied while making sign in signup
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            console.log(rf_token)
            jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) 
                {
                    console.log("Error in jwt verify")
                    return res.status(400).json({msg: "Please Login or Register"})
                }
                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            console.log("error thrown in refresh token")
            return res.status(500).json({msg: err.message})
        }
        
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/auth/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },//for logout just delete the refresh token from cookies
}


const createAccessToken = (user) =>{
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}//id ko sign krte ho with a secret access token
const createRefreshToken = (user) =>{
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports=controller