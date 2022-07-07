import  Router  from "express";
import CategoryController from "./controllers/CategoryController";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";

const routes = Router()

routes.get('/v1/user/:name', UserController.find)
routes.post('/v1/user', UserController.create)
routes.delete('/v1/user', UserController.delete)
routes.put('/v1/user', UserController.update)

routes.get('/v1/category', CategoryController.find)
routes.post('/v1/category', CategoryController.create)
routes.delete('/v1/category', CategoryController.delete)
routes.put('/v1/category', CategoryController.update)

routes.post('/v1/product', ProductController.create)
routes.get('/v1/product', ProductController.findAll)
routes.get('/v1/product/oneProduct', ProductController.findOne)

export default routes