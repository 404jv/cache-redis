import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserInfoController } from "./controllers/GetUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { authentication } from "./middleware/auth";

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const getUserInfoController = new GetUserInfoController();

const routes = Router();

routes.post('/users/create', createUserController.handle);

routes.post("/login", loginUserController.handle);

routes.get("/users/profile", authentication, getUserInfoController.handle);

export { routes };
