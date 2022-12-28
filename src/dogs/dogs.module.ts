import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from 'src/cats/cats.module';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/typeorm/entities/Cat';
import { Chase } from 'src/typeorm/entities/Chase';
import { Dog } from 'src/typeorm/entities/Dog';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
    imports: [TypeOrmModule.forFeature([Dog, Cat, Chase]), CatsModule],
    controllers: [DogsController],
    providers: [DogsService],
    exports: [DogsService]
})
export class DogsModule { }
