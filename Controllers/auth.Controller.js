import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
export const register = async(req, res)=>{
    const {email, username, password} = req.body
    try {
        if(!email || !password || !username) return res.status(400).json({message:"All the fields are mandatory"});
        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(user) return res.status(401).json({message:"The email address already exist"});
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser  = await prisma.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })
        res.status(200).json({message:"Registered successfully"})



        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    
        
    }
}
export const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({message:"All the fields are mandatory"});
        const user = await prisma.user.findUnique({where:{email}})
        if(!user) return res.status(404).json({message:"User not found"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res(401).json({message:"Credential is not valid"});
        const age = 100*60*60*24*7
        const token = jwt.sign({
            id : user.id
        }, process.env.JWT_SECRECT_TOKEN, {expiresIn:age})
        const {password:userPassword, ...userInfo} = user;
        res.cookie('token', token, {
            httpOnly:true,
            //secure:true,
            maxAge : age

        })
        res.status(200).json(userInfo)
        


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
        
    }
}
export const logout = async(req, res)=>{
    try {
        res.clearCookie('token').status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}