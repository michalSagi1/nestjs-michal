import { IsNumber, IsString, Length } from "class-validator";

export class CreateUsersDTO {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsNumber()
    phone: number;
}
export class CreateUserPostDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;


}
export class CreateUserProfileDTO {

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsString()
    email: string;


}