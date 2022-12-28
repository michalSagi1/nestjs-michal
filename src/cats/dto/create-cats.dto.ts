import { IsNumber, IsString, Length } from "class-validator";




export class CreateCatDTO {



    @IsString()
    @Length(3, 50)
    name: string;

    @IsNumber()
    soul: number = 9;
}