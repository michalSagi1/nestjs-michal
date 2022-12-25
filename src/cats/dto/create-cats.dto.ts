import { IsString, Length } from "class-validator";


export class CreateCatsDTO {
    readonly id: string;
    name: string;
    soul: number;
}


/**
 * We are using DTO's for input validtions.
 * There is a lib called 'class-validator' and its a good practice to use it.
*/
export class CreateCatDTO {

    @IsString()
    id: string;

    @IsString()
    @Length(3, 50)
    name: string;

    soul: 9;//I think that you shouldn't get soul as param, because every new cat have 9 souls
}