import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeleteFolderDto {
    @IsNotEmpty()
    @IsString()
    parent: string


    @IsNotEmpty()
    path: string[];

}