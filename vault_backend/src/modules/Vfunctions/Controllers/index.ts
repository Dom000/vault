import Container from "typedi";
import VfunctionService from "../Service";
import { Request, Response } from "express";
import { CreateFolderDto } from "../Dto/createfolder.dto";
import { DeleteFolderDto } from "../Dto/deletefolder.dto";
import { WriteDto } from "../Dto/write.dto";
import { MoveFolderDto } from "../Dto/movefolder.dto";

export class VfunctionController {

    async createFolder(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: CreateFolderDto = req.body

            const response = await VautService.createFolder(data)
            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async createFile(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: CreateFolderDto = req.body

            const response = await VautService.createFile(data)
            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async moveFolders(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: MoveFolderDto = req.body

            const response = await VautService.moveFolder(data)
            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async readFile(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: CreateFolderDto = req.body

            const response = await VautService.readFile(data)
            // console.log(response);

            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async readFolder(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: CreateFolderDto = req.body

            const response = await VautService.readFolder(data)
            // console.log(response);

            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async deleteFolder(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: DeleteFolderDto = req.body
            const response = await VautService.deleteFolder(data)

            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
    async writeFile(req: Request, res: Response) {
        const VautService = Container.get<VfunctionService>(VfunctionService)
        try {
            const data: WriteDto = req.body
            const response = await VautService.writeFile(data)

            res.status(response.status_code).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error',
                status_code: 500
            });
        }
    }
}