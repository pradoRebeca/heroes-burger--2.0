import  Router  from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

const routesAuth = Router()

routesAuth.post('/v1/user/auth', AuthController.login)
routesAuth.post('/v1/user', UserController.create)

export default routesAuth