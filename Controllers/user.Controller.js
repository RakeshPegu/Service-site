import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'

export const getUsers = async(req, res)=>{
    try {
        const users = await prisma.user.findMany()
       
        res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const getUser = async(req, res)=>{
    const id = req.params.id;
    const tokenUserId = req.userId
    if(id !== tokenUserId) return res.status(401).json({message:"You're not authorized to access this"})
    try {
       
        const user = await prisma.user.findUnique({
            where:{id}
        })
        if(!user) return res.status(404).json({message:'User not found'});
        res.status(200).json(user)

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const updateUser = async(req, res)=>{
    const userId = req.params.id
    const tokenUserId = req.userId
    if(userId !== tokenUserId) return res.status(401).json({message:"You'r not authorized to access it"});
    try {
       
        const {username, password, avatar} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.update({
            where:{id},
            data:{
                username,
                password:hashedPassword,
                avatar
            }
        })
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
    }
}
export const deleteUser = async(req, res)=>{
    const userId = req.params.id;
    const tokenUser = req.userId;
    if(userId !== tokenUser) return res.status(401).json({message:"You're not authorized"});
    try {
        
        await prisma.user.delete({
            where:{userId}
        })
        res.status(200).json({message:"The user deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
        
    }
}