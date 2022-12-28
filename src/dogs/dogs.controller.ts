import {
    Controller, Get,
    Param,
    NotFoundException,
    Body,
    Delete,
    Post,
    Patch,
    ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDTO } from 'src/cats/dto/create-cats.dto';
import { Success } from 'src/typeorm/entities/Chase';
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
    async getDog(@Param('dogID') dogID: number) {

        const dog = await this.dogsService.getDogById(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return dog;
    }
    @Get('/success/:dogID')
    async getSuccessDog(@Param('dogID') dogID: number) {

        const dog = await this.dogsService.getDogAndSuccessById(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return dog;
    }
    @Get('/cat/:dogID')
    async getDogAndCats(@Param('dogID') dogID: number) {

        const dog = await this.dogsService.getDogAndCatById(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return dog;
    }

    @Get('/')
    async getDogs() {
        const dogs = await this.dogsService.getDogs()
        return dogs;
    }

    @Patch('/:dogID')
    async edit(
        @Param('dogID') dogID: number,
        @Body('name') name: string,
        @Body('count') count: number,
    ) {
        const editedDog = await this.dogsService.updateDog(dogID, name, count);
        return {
            message: 'Dog has been successfully updated',
            dog: editedDog,
        };
    }

    @Delete('/delete/:dogID')
    async deleteDog(@Param('dogID') dogID: number) {
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
    async play(@Param('dogID') dogID: number) {
        return await this.dogsService.play(dogID)
    }

}



