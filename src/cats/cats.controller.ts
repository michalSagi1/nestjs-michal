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
    @Get('/:catID')
    async getCat(@Param('catID') catID: string) {

        const cat = await this.catsService.getCat(catID);
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
    async editTodo(
        @Param('catID') catID: string,
        @Body('name') name: string,//notice you don't have validations :)
        @Body('soul') soul: number,
    ) {
        const editedCat = await this.catsService.editCat(catID, name, soul);
        if (!editedCat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return {
            message: 'Cat has been successfully updated',
            cat: editedCat,
        };
    }

    @Delete('/delete/:catID')
    async deleteCat(@Param('catID') catID) {
        const deletedCat = await this.catsService.deleteCat(catID);
        if (!deletedCat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return {
            message: 'Cat has been deleted!',
            cat: deletedCat,
        };
    }



}
