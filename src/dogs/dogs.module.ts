import { Module } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
    controllers: [DogsController],
    providers: [DogsService, CatsService],//The purpose of module is to resolve dependencies and provide whole class. You need to import module and not serivce :)
})
export class DogsModule { }
