import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDTO } from './dto/create-cats.dto';

type Cat = {
    readonly id: string;
    name: string;
    soul: number;
}

@Injectable()
export class CatsService {

    private cats: Cat[] = [
        {
            id: "1",
            name: 'Mitzi',
            soul: 9
        },
        {
            id: "2",
            name: 'Luly',
            soul: 9

        },
        {
            id: "3",
            name: 'Kitty',
            soul: 9

        }
    ];

    constructor() {
        setTimeout(() => {
            console.log("Im a cats service instance!");
        }, 1000);
    }

    async addCat(createCatsDTO: CreateCatDTO): Promise<Cat> {
        await this.cats.push(createCatsDTO);
        return this.cats.at(-1);
    }

    async getCat(catID: string): Promise<Cat> {
        const cat = this.cats.find((cat) => cat.id === catID);
        return cat
    }

    async getCats(): Promise<Cat[]> {
        return this.cats;
    }
    async editCat(catID: string, name: string, soul: number): Promise<Cat> {
        const cat = this.cats.find((cat) => cat.id === catID);
        if (!cat) {
            throw new NotFoundException('Cats does not exist!');
        }
        const catIndex = this.cats.findIndex((cat) => cat.id === catID);
        const editedCat = { ...cat }
        if (name) {
            editedCat.name = name
        }
        if (soul > 0) {
            editedCat.soul = soul
        }
        this.cats[catIndex] = editedCat
        if (soul < 1) {
            const delCat = await this.deleteCat(catID)
            console.log("delete....", delCat);
            editedCat.soul = 0

            return delCat[0]
        }
        return this.cats[catIndex]

    }

    async deleteCat(catID: string): Promise<any> {
        const catIndex = this.cats.findIndex((cat) => cat.id === catID);
        return this.cats.splice(catIndex, 1)

    }


    async getRandomCat(): Promise<any> {
        function getRndInteger(min: number, max: number) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const cats = await this.getCats()

        const random = getRndInteger(0, cats.length)

        const cat = cats[random];
        if (!cat) {
            console.log("GAME OVER");

        } else {

            console.log(`Lets chase ${cat.name} cat!!`);
            return cat
        }
    }


}
/** All functions here are not really async functions, so for now it makes sense to decalre them as sync.
* In the next exercise they will be async function, so you don't have to change it. But just letting you know:)
*/