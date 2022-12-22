import { Injectable, NotFoundException } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateDogsDTO } from './create-dogs.dto';

interface Dogs {
    readonly id: string;
    name: string;
    count: number;
}
@Injectable()
export class DogsService {
    private dogs: Dogs[] = [
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

    async addDog(createDogsDTO: CreateDogsDTO): Promise<Dogs> {
        await this.dogs.push(createDogsDTO);
        return this.dogs.at(-1);
    }

    async getDog(dogID: string): Promise<Dogs> {
        const dog = this.dogs.find((dog) => dog.id === dogID);
        return dog
    }

    async getDogs(): Promise<Dogs[]> {
        return this.dogs;
    }
    async editDog(dogID: string, name: string, count: number): Promise<Dogs> {
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

}

