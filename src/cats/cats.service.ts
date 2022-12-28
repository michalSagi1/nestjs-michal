import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/typeorm/entities/Cat';
import { Chase, Success } from 'src/typeorm/entities/Chase';
import { DataSource, Repository } from 'typeorm';
import { CreateCatDTO } from './dto/create-cats.dto';

@Injectable()
export class CatsService {


    constructor(@InjectRepository(Cat)
    private catRepository: Repository<Cat>
    ) {
        setTimeout(() => {
            console.log("Im a cats service instance!");
        }, 1000);
    }


    async addCat(createCatsDTO: CreateCatDTO) {
        const newCat = await this.catRepository.create({ ...createCatsDTO })
        return await this.catRepository.save(newCat)
    }


    async getCatById(id: number) {
        const cat = await this.catRepository.findOne({
            where:
                { id },

        })
        return cat
    }


    async getCats() {
        return await this.catRepository.find()
    }


    async updateCat(id: number, name: string, soul: number) {
        const cat = await this.catRepository.findOne({
            where:
                { id }
        })
        if (!cat) {
            return 'CAT NOT FOUND'
        }
        if (!name && soul === undefined) {
            return 'NO UPDATED'
        }
        // if (soul < 1) {
        //     const delCat = await this.deleteCat(id)
        //     console.log("delete....", delCat);

        // }


        const upCat = this.catRepository.update({ id }, { name, soul })
        return upCat;


    }


    async deleteCat(id: number) {
        const cat = await this.catRepository.findOne({
            where:
                { id }
        })
        if (!cat) {
            return 'CAT NOT FOUND'
        }
        this.catRepository.delete({ id })
        return 'Cat is deleted'



    }

    async getRandomCat_() {

        const randomCat = await this.catRepository
            .createQueryBuilder().select().where('cat.soul>0')
            .orderBy('RAND()')
            .getOne()
        if (!randomCat) {
            console.log("GAME OVER");

        } else {

            console.log(`Lets chase ${randomCat.name} cat!!`);
            return randomCat;
        }


    }

    async getCatsSuccess() {
        const cats = await this.catRepository.find({
            where:
                { chases: { success: Success.No } },

            relations: ['chases']

        })
        return cats
    }

    async getDogAndCatById(id: number) {
        const resulte = await this.catRepository.createQueryBuilder('cat')
            .select(['cat.name'])
            .leftJoin(Chase, "chases", "cat.id=chases.catId")
            .where(`dogId=${id}`)
            .getMany()

        return resulte
    }
}
