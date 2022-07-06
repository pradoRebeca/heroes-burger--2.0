import  Router  from "express";
import UserController from "./controllers/UserController";

const routes = Router()

routes.get('/v1/user', UserController.find)
routes.post('/v1/user', UserController.create)
routes.delete('/v1/user', UserController.delete)

export default routes