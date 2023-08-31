import Container, { Service } from "typedi";
import { CreateUserDto } from "../Dto/auth.dto";
import { HttpException } from "@/utils/HttpException";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import * as argon from "argon2"
import { VfunctionController } from "@/modules/Vfunctions/Controllers";
import VfunctionService from "@/modules/Vfunctions/Service";


@Service()
export default class AuthService {
    public prisma = new PrismaClient
    public vFunctions = Container.get<VfunctionService>(VfunctionService)

    async createUser(data: CreateUserDto) {
        try {
            const checkEmail = await this.prisma.users.findUnique({
                where: {
                    email: data.email,

                }
            })

            if (checkEmail) {
                return {
                    status_code: 400,
                    status: false,
                    message: "Email already exists kindly login"
                }
            }
            const hashed_password = await argon.hash(data.password)

            const user = await this.prisma.users.create({
                data: {
                    email: data.email,
                    full_name: data.full_name,
                    password: hashed_password,

                },
            });
            if (user) {
                await this.vFunctions.createFolder({ name: user.id, path: "" })
                await this.prisma.folder.create({
                    data: {
                        userid: user.id
                    },
                })
                return {
                    status_code: 200,
                    status: true,
                    message: "user created",

                }
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new HttpException(400, `Email already exist`)
                }
            } else {
                throw new HttpException(500, `${error}`)
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }
}