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
    async create(@Res() res, @Body() createDogsDTO: CreateDogsDTO) {
        const newDog = await this.dogsService.addDog(createDogsDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Dog has been submitted successfully!',
            dog: newDog,
        });
    }
    @Get('/:dogID')
    async getCat(@Res() res, @Param('dogID') dogID) {

        const dog = await this.dogsService.getDog(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return res.status(HttpStatus.OK).json(dog);
    }

    @Get('/')
    async getCats(@Res() res) {
        const dogs = await this.dogsService.getDogs()
        return res.status(HttpStatus.OK).json(dogs);
    }

    @Patch('/:dogID')
    async editTodo(
        @Res() res,
        @Param('dogID') dogID: string,
        @Body('name') name: string,
        @Body('count') count: number,
    ) {
        const editedDog = await this.dogsService.editDog(dogID, name, count);
        if (!editedDog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Dog has been successfully updated',
            dog: editedDog,
        });
    }

    @Delete('/delete/:dogID')
    async deleteCat(@Res() res, @Param('dogID') dogID) {
        const deletedDog = await this.dogsService.deleteDog(dogID);
        if (!deletedDog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Dog has been deleted!',
            dog: deletedDog,
        });
    }

    @Post('/play')
    async play(
    ) {
        /**This function should be in DogService- because it performs a lot of logical actions, and its very related to dogs behavior.
        * We usually use controllers to organize data and activate service function (service should take care of login and DB).
        */

        //I think I you should have a function in cats service called "getRandomCat";
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const dog = await this.dogsService.getDog("1")//Im sure you wanted to get this as post param and pass it ;)

        const cats = await this.catsService.getCats()
        if (cats.length === 0) {
            return "GAME OVER"
        }

        const random = getRndInteger(0, cats.length)

        const cat = cats[random];

        console.log(`Lets chase ${cat.name} cat!!`);

        const success = getRndInteger(0, 2)
        console.log(success);
        if (success) {
            const upDog = await this.dogsService.editDog("1", "", dog.count + 1)
            console.log(upDog);
            const upCat = await this.catsService.editCat(cat.id, "", cat.soul - 1)
            console.log(upCat);
            if (cat.soul === 1) {//I think this is a cats logic- should be in service:)
                const delCat = await this.catsService.deleteCat(cat.id)
                console.log("delete....", delCat);

            }
            return ((cat.soul === 1) ? `${cat.name} is dead :/` : `${cat.name} has ${upCat.soul} more souls!`)

        } else {
            console.log(`the cat ${cat.name} is very lucky!`);
            return `the cat ${cat.name} is very lucky!`

        }

    }

}
