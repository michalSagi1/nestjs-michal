import {
    Controller, Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Body,
    Delete,
    Post,
    Patch,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateDogsDTO } from './create-dogs.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private dogsService: DogsService,
        private catsService: CatsService) { }

    @Post('/')
    async create(@Body() createDogsDTO: CreateDogsDTO) {
        const newDog = await this.dogsService.addDog(createDogsDTO);
        return {
            message: 'Dog has been submitted successfully!',
            dog: newDog,
        };
    }
    @Get('/:dogID')
    async getCat(@Param('dogID') dogID: string) {

        const dog = await this.dogsService.getDog(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return dog;
    }

    @Get('/')
    async getCats() {
        const dogs = await this.dogsService.getDogs()
        return dogs;
    }

    @Patch('/:dogID')
    async editTodo(
        @Param('dogID') dogID: string,
        @Body('name') name: string,
        @Body('count') count: number,
    ) {
        const editedDog = await this.dogsService.editDog(dogID, name, count);
        if (!editedDog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return {
            message: 'Dog has been successfully updated',
            dog: editedDog,
        };
    }

    @Delete('/delete/:dogID')
    async deleteCat(@Param('dogID') dogID: string) {
        const deletedDog = await this.dogsService.deleteDog(dogID);
        if (!deletedDog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return {
            message: 'Dog has been deleted!',
            dog: deletedDog,
        };
    }

    @Post('/play/:dogID')
    async play(@Param('dogID') dogID: string) {
        return await this.dogsService.play(dogID)
    }

}



