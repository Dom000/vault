import { Request, Response } from "express";
import { CreateUserDto } from "../Dto/auth.dto";
import Container from "typedi";
import AuthService from "../Service";

export class AuthController {
    async createUser(req: Request, res: Response) {
        const authService = Container.get<AuthService>(AuthService)

        try {

            const data: CreateUserDto = req.body
            const response = await authService.createUser(data)
            res.status(response.status_code).json(response);
        } catch (error) {

        }
    }
}