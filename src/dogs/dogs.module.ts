import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CatsService } from 'src/cats/cats.service';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
    imports: [CatsModule],
    controllers: [DogsController],
    providers: [DogsService],
    exports: [DogsService]
})
export class DogsModule { }
