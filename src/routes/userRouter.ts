import {Router} from "express"
import {createUser, signIn, updateUser} from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()


router.post('/signup', createUser)

router.post('/signin', signIn)

router.put('/update',authMiddleware,  updateUser)



export default router