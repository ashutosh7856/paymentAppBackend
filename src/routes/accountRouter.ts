import { Router } from "express";
import {transferFunds, viewFunds} from "../controllers/accountController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()


router.post('/transfer',authMiddleware,  transferFunds)

router.get('/view',authMiddleware, viewFunds)

router.get('/history', authMiddleware)


export default router