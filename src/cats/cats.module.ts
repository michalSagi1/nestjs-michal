import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/typeorm/entities/Cat';
import { Chase } from 'src/typeorm/entities/Chase';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cat, Chase])],

    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule { }
