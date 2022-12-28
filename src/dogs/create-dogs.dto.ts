import { IsString, Length } from "class-validator";
import { Success } from "src/typeorm/entities/Chase";

export class CreateDogsDTO {

    @IsString()
    @Length(3, 50)
    name: string;

    count: number = 0;
}
export class CreateChaseDTO {

    succes: Success;

}