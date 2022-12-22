import { Module } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
    controllers: [DogsController],
    providers: [DogsService, CatsService],
})
export class DogsModule { }
