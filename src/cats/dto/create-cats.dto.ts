import { IsString, Length } from "class-validator";




export class CreateCatDTO {

    @IsString()
    id: string;

    @IsString()
    @Length(3, 50)
    name: string;

    soul: number = 9;
}