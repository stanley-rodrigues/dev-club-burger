import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'

import authMiddleware from "./app/middlewares/auth"
import SessionController from './app/controllers/SessionController'
import CategoryController from './app/controllers/CategoryController'
import ProductController from './app/controllers/ProductController'
import OrderController from './app/controllers/OrderController'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // será chamado por todas as rotas ABAIXO

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.get('/orders', OrderController.store)

export default routes   