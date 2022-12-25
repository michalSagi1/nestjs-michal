import { IsString, Length } from "class-validator";

export class CreateDogsDTO {

    @IsString()
    id: string;

    @IsString()
    @Length(3, 50)
    name: string;

    count: number = 0;
}