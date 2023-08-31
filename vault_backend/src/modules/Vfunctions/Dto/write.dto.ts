import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class WriteDto {
    @IsNotEmpty()
    @IsString()
    parent: string


    @IsNotEmpty()
    filepath: string;

    @IsNotEmpty()
    content: string

}