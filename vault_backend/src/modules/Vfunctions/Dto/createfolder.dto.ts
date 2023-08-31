import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFolderDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    path: string;

}