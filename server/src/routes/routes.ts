import { Router } from 'express'
import { register, login, deleteAccount } from '../controllers/AuthController'

const router = Router()

// Auth routes
const authPrefix = '/auth'
router.post(`${authPrefix}/register`, register)
router.post(`${authPrefix}/login`, login)
router.delete(`${authPrefix}/delete/:id`, deleteAccount)

export default router
