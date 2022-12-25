import { Injectable, NotFoundException } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateDogsDTO } from './create-dogs.dto';

type Dog = {
    readonly id: string;
    name: string;
    count: number;
}
@Injectable()
export class DogsService {

    constructor(private catsService: CatsService) { }

    private dogs: Dog[] = [
        {
            id: "1",
            name: 'Rex',
            count: 0
        },
        {
            id: "2",
            name: 'Sky',
            count: 0

        },
        {
            id: "3",
            name: 'Boxer',
            count: 0

        }
    ];

    async addDog(createDogsDTO: CreateDogsDTO): Promise<Dog> {
        await this.dogs.push(createDogsDTO);
        return this.dogs.at(-1);
    }

    async getDog(dogID: string): Promise<Dog> {
        const dog = this.dogs.find((dog) => dog.id === dogID);
        return dog
    }

    async getDogs(): Promise<Dog[]> {
        return this.dogs;
    }
    async editDog(dogID: string, name: string, count: number): Promise<Dog> {
        const dog = this.dogs.find((dog) => dog.id === dogID);
        if (!dog) {
            throw new NotFoundException('dog does not exist!');
        }
        const dogIndex = this.dogs.findIndex((dog) => dog.id === dogID);
        const editedDog = { ...dog }
        if (name) {
            editedDog.name = name
        }
        if (count) {
            editedDog.count = count
        }
        this.dogs[dogIndex] = editedDog
        return this.dogs[dogIndex]
    }


    async deleteDog(dogID: string): Promise<any> {
        const dogIndex = this.dogs.findIndex((dog) => dog.id === dogID);
        return this.dogs.splice(dogIndex, 1)

    }

    async play(dogID: string): Promise<any> {
        function getRndInteger(min: number, max: number) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const dog = await this.getDog(dogID)

        const cat = await this.catsService.getRandomCat()
        if (!cat) {
            return "GAME OVER"
        }
        else {

            const success = getRndInteger(0, 2)
            console.log(success);
            if (success) {
                const upDog = await this.editDog(dogID, "", dog.count + 1)
                console.log(upDog);
                const upCat = await this.catsService.editCat(cat.id, "", cat.soul - 1)
                console.log(upCat);

                return ((upCat.soul === 0) ? `${upCat.name} is dead :/` : `${upCat.name} has ${upCat.soul} more souls!`)

            } else {
                console.log(`the cat ${cat.name} is very lucky!`);
                return `the cat ${cat.name} is very lucky!`

            }
        }

    }

}

