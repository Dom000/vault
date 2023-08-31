import { Router } from "express";
import { Routes } from "../../../../interface/routes.interface";
import { ValidationMiddleware } from "../../../middleware/validation.middleware";
import { VfunctionController } from "../Controllers";
import { CreateFolderDto } from "../Dto/createfolder.dto";
import { DeleteFolderDto } from "../Dto/deletefolder.dto";
import { WriteDto } from "../Dto/write.dto";
import { MoveFolderDto } from "../Dto/movefolder.dto";



export class FolderRoute implements Routes {
    public path = '/Folder';
    public router = Router();
    public Vfunction = new VfunctionController()

    constructor() {
        this.initializeRoutes();

    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, ValidationMiddleware(CreateFolderDto,), this.Vfunction.createFolder);
        this.router.post(`${this.path}/create_file`, ValidationMiddleware(CreateFolderDto,), this.Vfunction.createFile);
        this.router.post(`${this.path}/read_file`, ValidationMiddleware(CreateFolderDto,), this.Vfunction.readFile);
        this.router.post(`${this.path}/read_folder`, ValidationMiddleware(CreateFolderDto,), this.Vfunction.readFolder);
        this.router.post(`${this.path}/delete`, ValidationMiddleware(DeleteFolderDto,), this.Vfunction.deleteFolder);
        this.router.post(`${this.path}/write`, ValidationMiddleware(WriteDto,), this.Vfunction.writeFile);
        this.router.post(`${this.path}/move`, ValidationMiddleware(MoveFolderDto,), this.Vfunction.moveFolders);

    }
}
