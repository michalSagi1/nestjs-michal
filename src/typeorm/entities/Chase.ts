import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./Cat";
import { Dog } from "./Dog";


export enum Success {
    Yes = 'Yesss',
    No = 'NO'

}
@Entity({ name: 'chases' })

export class Chase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: Success, type: 'enum' })
    success: Success

    @ManyToOne(() => Dog, (dog) => dog.chases)
    dog: Dog;

    @ManyToOne(() => Cat, (cat) => cat.chases)
    cat: Cat;
}
