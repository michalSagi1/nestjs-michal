import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { DogsController } from './dogs/dogs.controller';
import { DogsService } from './dogs/dogs.service';
import { DogsModule } from './dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { Cat } from './typeorm/entities/Cat';
import { Dog } from './typeorm/entities/Dog';
import { Chase } from './typeorm/entities/Chase';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123',
    database: 'test_nest',
    entities: [User, Post, Profile, Cat, Dog, Chase],
    synchronize: true, logging: true
  }), CatsModule, DogsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
