import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MoveFolderDto {
    @IsNotEmpty()
    @IsString()
    parent: string

    @IsNotEmpty()
    @IsString()
    destination: string

    @IsNotEmpty()
    path: string[];

}