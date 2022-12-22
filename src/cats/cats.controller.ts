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
import { CatsService } from './cats.service';
import { CreateCatsDTO } from './dto/create-cats.dto';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Post('/')
    async create(@Res() res, @Body() createCatsDTO: CreateCatsDTO) {
        const newCat = await this.catsService.addCat(createCatsDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been submitted successfully!',
            cat: newCat,
        });
    }
    @Get('/:catID')
    async getCat(@Res() res, @Param('catID') catID) {

        const cat = await this.catsService.getCat(catID);
        if (!cat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return res.status(HttpStatus.OK).json(cat);
    }

    @Get('/')
    async getCats(@Res() res) {
        const cats = await this.catsService.getCats()
        return res.status(HttpStatus.OK).json(cats);
    }

    @Patch('/:catID')
    async editTodo(
        @Res() res,
        @Param('catID') catID: string,
        @Body('name') name: string,
        @Body('soul') soul: number,
    ) {
        const editedCat = await this.catsService.editCat(catID, name, soul);
        if (!editedCat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been successfully updated',
            cat: editedCat,
        });
    }

    @Delete('/delete/:catID')
    async deleteCat(@Res() res, @Param('catID') catID) {
        const deletedCat = await this.catsService.deleteCat(catID);
        if (!deletedCat) {
            throw new NotFoundException('Cat does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been deleted!',
            cat: deletedCat,
        });
    }



}
