import express from 'express'
import { verifyToken } from '../middleWare/verifyToken.js'
import { deleteUser, getUser, getUsers, updateUser } from '../Controllers/user.Controller.js'
const router = express.Router()
router.get('/', getUsers)
router.get('/:id',verifyToken, getUser )
router.put('/:id', verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)
export default router;