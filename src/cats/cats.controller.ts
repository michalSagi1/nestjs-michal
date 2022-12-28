import {
    Controller, Get,
    Param,
    NotFoundException,
    Body,
    Delete,
    Post,
    Patch,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cats.dto';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Post('/')
    async create(@Body() createCatsDTO: CreateCatDTO) {
        const newCat = await this.catsService.addCat(createCatsDTO);
        return {
            message: 'Cat has been submitted successfully!',
            cat: newCat,
        };
    }
    @Get('/cat/:dogID')
    async getDogAndCats(@Param('dogID') dogID: number) {

        const dog = await this.catsService.getDogAndCatById(dogID);
        if (!dog) {
            throw new NotFoundException('Dog does not exist!');
        }
        return dog;
    }
    @Get('/success')
    async getCatsSuccess() {
        const cats = await this.catsService.getCatsSuccess()
        return cats;
    }
    @Get('/get/:catID')
    async getCat(@Param('catID') catID: number) {

        const cat = await this.catsService.getCatById(catID);
        if (!cat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return cat;
    }

    @Get('/')
    async getCats() {
        const cats = await this.catsService.getCats()
        return cats;
    }

    @Patch('/:catID')
    async updateCat(
        @Param('catID') catID: number,
        @Body('name') name: string,
        @Body('soul') soul: number,
    ) {

        const editedCat = await this.catsService.updateCat(catID, name, soul);

        return {
            cat: editedCat,
        };
    }

    @Delete('/delete/:catID')
    async deleteCat(@Param('catID') catID: number) {
        const deletedCat = await this.catsService.deleteCat(catID);

        return {
            message: 'Cat has been deleted!',
            cat: deletedCat,
        };
    }

    @Get('/get/random')
    async random() {
        return await this.catsService.getRandomCat_()
    }

}
