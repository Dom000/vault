import { HttpException } from "@/utils/HttpException";
import { Service } from "typedi";
import { CreateFolderDto } from "../Dto/createfolder.dto";
import fs from "fs"
import path from "path"
import { DeleteFolderDto } from "../Dto/deletefolder.dto";
import { WriteDto } from "../Dto/write.dto";
import { MoveFolderDto } from "../Dto/movefolder.dto";

@Service()
export default class VfunctionService {
    isImage(path: string): Awaited<Promise<Boolean>> {

        const imageExt = [
            '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.ico', '.jfif', '.pjpeg', '.pjp', '.avif'
        ]
        return imageExt.includes(path)
    }

    isVideo(path: string): Awaited<Promise<Boolean>> {

        const videoExt = [
            '.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv', '.webm', '.mpg', '.mpeg', '.3gp', '.m4v', '.ogv', '.m2v', '.mxf', '.asf'
        ]
        return videoExt.includes(path)
    }

    isAudio(path: string): Awaited<Promise<Boolean>> {

        const audioExt = [
            '.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.wma', '.aiff', '.ape', '.opus', '.mid', '.midi', '.amr'
        ]
        return audioExt.includes(path)
    }





    async createFolder(data: CreateFolderDto) {
        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", data.path)

            if (!fs.existsSync(path.join(VaultAbsolutePath, data.name))) {
                fs.mkdirSync(path.join(VaultAbsolutePath, data.name))
            }

            return {
                status_code: 200,
                status: true,
                message: "Folder created",
            }

        } catch (error) {
            throw new HttpException(500, `${error.message}`)
        }
    }

    async createFile(data: CreateFolderDto) {
        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", data.path)

            if (!fs.existsSync(path.join(VaultAbsolutePath, data.name))) {
                fs.writeFileSync(path.join(VaultAbsolutePath, data.name), "")
            }

            return {
                status_code: 200,
                status: true,
                message: "File created",
            }

        } catch (error) {
            throw new HttpException(500, `${error.message}`)
        }
    }

    async readFile(data: CreateFolderDto) {
        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", data.path)

            let response: {
                status_code: number,
                status: boolean,
                message: string,
                data?: any
            }

            if (fs.existsSync(path.join(VaultAbsolutePath, data.name))) {
                const filePath = path.join(VaultAbsolutePath, data.name);
                const statOb = fs.statSync(filePath)

                if (statOb.isFile() && this.isImage(path.extname(filePath))) {
                    response = {
                        status_code: 200,
                        status: true,
                        message: "image loaded completely",
                        data: filePath
                    }
                } else if (statOb.isFile() && this.isVideo(path.extname(filePath))) {
                    response = {
                        status_code: 200,
                        status: true,
                        message: "video loaded completely",
                        data: filePath
                    }
                } else if (statOb.isFile() && this.isAudio(path.extname(filePath))) {
                    response = {
                        status_code: 200,
                        status: true,
                        message: "audio loaded completely",
                        data: filePath
                    }
                } else {
                    const result = fs.readFileSync(filePath, 'utf8');
                    response = {
                        status_code: 200,
                        status: true,
                        message: "file loaded completely",
                        data: result
                    }
                }

            } else {
                // file not found in the vault directory
                response = {
                    status_code: 404,
                    status: true,
                    message: "file not found",
                }
            }

            return response

        } catch (error) {
            throw new HttpException(500, `${error.message}`)
        }
    }

    async readFolder(data: CreateFolderDto) {
        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", data.path)
            const items = fs.readdirSync(VaultAbsolutePath)

            let response: {
                status_code: number,
                status: boolean,
                message: string,
                data?: any
            }

            if (fs.existsSync(VaultAbsolutePath)) {
                response = {
                    status_code: 200,
                    status: true,
                    message: "folder loaded completely",
                    data: items
                }
            } else {
                response = {
                    status_code: 404,
                    status: true,
                    message: "folder not found",
                }
            }
            return response

        } catch (error) {
            throw new HttpException(500, `${error.message}`)

        }
    }
    async deleteFolder(paths: DeleteFolderDto) {

        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", paths.parent)


            // Function to recursively delete a directory and its contents
            const deletePathRecursive = function (currentPath: string) {
                if (fs.existsSync(VaultAbsolutePath)) {
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        // If the current path is a directory, iterate over its contents
                        fs.readdirSync(currentPath).forEach((file) => {
                            const curPath = path.join(currentPath, file);
                            deletePathRecursive(curPath);
                        });

                        // After emptying the directory, delete it
                        fs.rmdirSync(currentPath);
                    } else {
                        // If the current path is a file, simply delete it
                        fs.unlinkSync(currentPath);
                    }
                }
            };



            // Iterate through the array and delete each path
            paths.path.forEach((pathToDelete) => {
                const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", paths.parent, pathToDelete)
                deletePathRecursive(VaultAbsolutePath);
                // console.log(`Deleted: ${VaultAbsolutePath}`);
            });

            return {
                status_code: 200,
                status: true,
                message: "items deleted completely",
            }

        } catch (error) {
            throw new HttpException(500, `${error.message}`)

        }
    }
    async moveFolder(paths: MoveFolderDto) {

        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", paths.parent)
            const destinationFolder = path.join(__dirname, "..", "..", "..", "..", "vault", paths.parent, paths.destination)



            const movePath = (sourcePath: string, destinationPath: string) => {
                // Get the source and destination paths
                const sourceAbsolutePath = path.resolve(sourcePath);
                const destinationAbsolutePath = path.join(destinationPath, path.basename(sourcePath));

                // Move the source to the destination
                fs.renameSync(sourceAbsolutePath, destinationAbsolutePath);
            };

            if (fs.existsSync(VaultAbsolutePath) && fs.existsSync(destinationFolder)) {
                // Move each source path to the destination folder
                paths.path.forEach((sourcePath) => {
                    const AbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", paths.parent, sourcePath)

                    movePath(AbsolutePath, destinationFolder);
                });

                return {
                    status_code: 200,
                    status: true,
                    message: "items moved completely",
                }
            } else {
                return {
                    status_code: 404,
                    status: true,
                    message: "destination folder not found",
                }
            }


        } catch (error) {
            throw new HttpException(500, `${error.message}`)

        }
    }
    async writeFile(data: WriteDto) {
        try {
            const VaultAbsolutePath = path.join(__dirname, "..", "..", "..", "..", "vault", data.parent, data.filepath)

            let response: {
                status_code: number,
                status: boolean,
                message: string,
                data?: any
            }

            if (fs.existsSync(VaultAbsolutePath)) {
                fs.writeFileSync(VaultAbsolutePath, data.content)
                const result = fs.readFileSync(VaultAbsolutePath, 'utf8');

                response = {
                    status_code: 201,
                    status: true,
                    message: "updated successfully",
                    data: result
                }
            } else {
                response = {
                    status_code: 404,
                    status: true,
                    message: "file not found",
                }
            }
            return response

        } catch (error) {
            throw new HttpException(500, `${error.message}`)

        }
    }
}
