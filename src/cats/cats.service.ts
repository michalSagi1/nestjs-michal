import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatsDTO } from './dto/create-cats.dto';

interface Cats {
    readonly id: string;
    name: string;
    soul: number;
}

@Injectable()
export class CatsService {

    private cats: Cats[] = [
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

    async addCat(createCatsDTO: CreateCatsDTO): Promise<Cats> {
        await this.cats.push(createCatsDTO);
        return this.cats.at(-1);
    }

    async getCat(catID: string): Promise<Cats> {
        const cat = this.cats.find((cat) => cat.id === catID);
        return cat
    }

    async getCats(): Promise<Cats[]> {
        return this.cats;
    }
    async editCat(catID: string, name: string, soul: number): Promise<Cats> {
        const cat = this.cats.find((cat) => cat.id === catID);
        if (!cat) {
            throw new NotFoundException('Cats does not exist!');
        }
        const catIndex = this.cats.findIndex((cat) => cat.id === catID);
        const editedCat = { ...cat }
        if (name) {
            editedCat.name = name
        }
        if (soul) {
            editedCat.soul = soul
        }
        this.cats[catIndex] = editedCat
        return this.cats[catIndex]
    }

    async deleteCat(catID: string): Promise<any> {
        const catIndex = this.cats.findIndex((cat) => cat.id === catID);
        return this.cats.splice(catIndex, 1)

    }
}
