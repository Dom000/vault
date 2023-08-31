import { Router } from "express";
import { Routes } from "../../../../interface/routes.interface";
import { ValidationMiddleware } from "../../../middleware/validation.middleware";
import { AuthController } from "../Controllers";
import { CreateUserDto } from "../Dto/auth.dto";


export class AuthRoute implements Routes {
    public path = '/user';
    public router = Router();
    public auth = new AuthController()

    constructor() {
        this.initializeRoutes();

    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, ValidationMiddleware(CreateUserDto), this.auth.createUser);

    }
}
