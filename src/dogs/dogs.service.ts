import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/typeorm/entities/Cat';
import { Chase, Success } from 'src/typeorm/entities/Chase';
import { Dog } from 'src/typeorm/entities/Dog';
import { Repository } from 'typeorm';
import { CreateDogsDTO } from './create-dogs.dto';


@Injectable()
export class DogsService {

    constructor(private catsService: CatsService,
        @InjectRepository(Dog)
        private dogRepository: Repository<Dog>,
        @InjectRepository(Chase)
        private chaseRepository: Repository<Chase>) { }



    async addDog(createDogsDTO: CreateDogsDTO) {
        const newDog = await this.dogRepository.create({ ...createDogsDTO })
        return await this.dogRepository.save(newDog)
    }


    async getDogById(id: number) {
        const dog = await this.dogRepository.findOne({
            where:
                { id },
            relations: ['chases']
        })
        return dog
    }
    async getDogAndSuccessById(id: number) {
        const dog = await this.dogRepository.findOne({
            where:
                { id, chases: { success: Success.Yes } },

            relations: ['chases']

        })
        return dog

    }
    async getDogAndCatById(id: number) {
        const resulte = await this.chaseRepository.createQueryBuilder('chase')
            // .leftJoinAndSelect(Cat, "cat")
            // .leftJoinAndSelect(Dog, "dog")

            .select('catId')
            .where(`dogId=${id}`)
            .getMany()

        return resulte


    }



    async getDogs() {
        return await this.dogRepository.find({ relations: ['chases'] })
    }


    async updateDog(id: number, name: string, count: number) {
        const dog = await this.dogRepository.findOne({
            where:
                { id }
        })
        if (!dog) {
            throw new NotFoundException('dog does not exist!');
        }
        if (!name && count === undefined) {
            return 'NO UPDATED'
        }

        const upDog = this.dogRepository.update({ id }, { name, count })
        return upDog;
    }


    async deleteDog(id: number) {
        const dog = await this.dogRepository.findOne({
            where:
                { id }
        })
        if (!dog) {
            return 'CAT NOT FOUND'
        }
        this.dogRepository.delete({ id })
        return 'Dog is deleted'



    }

    async play(dogID: number) {
        function getRndInteger(min: number, max: number) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const dog = await this.getDogById(dogID)

        const cat = await this.catsService.getRandomCat_()
        if (!cat) {
            return "GAME OVER"
        }
        else {

            const success = getRndInteger(0, 2)
            console.log(success);
            if (success) {
                await this.updateDog(dogID, dog.name, dog.count + 1)
                const upDog = await this.getDogById(dogID)

                console.log(upDog);
                await this.catsService.updateCat(cat.id, cat.name, cat.soul - 1)
                const upCat = await this.catsService.getCatById(cat.id)

                console.log(upCat);

                this.createChase(upCat.id, upDog.id, Success.Yes)
                return ((upCat.soul === 0) ? `${cat.name} is dead :/` : `${upCat.name} has ${upCat.soul} more souls!`)
            } else {
                console.log(`the cat ${cat.name} is very lucky!`);
                this.createChase(cat.id, dog.id, Success.No)
                return `the cat ${cat.name} is very lucky!`

            }
        }

    }


    async createChase(idCat: number, idDog: number, success: Success) {
        const dog = await this.dogRepository.findOne({
            where:
                { id: idDog }
        })
        if (!dog) {
            return 'DOG NOT FOUND'
        }
        const cat = await this.catsService.getCatById(idCat)
        console.log(cat);

        if (!cat) {
            return 'CAT NOT FOUND'
        }
        const newChase = this.chaseRepository.create({ cat, dog, success })
        return await this.chaseRepository.save(newChase);

    }
}

