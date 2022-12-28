import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chase } from "./Chase";

@Entity({ name: 'dogs' })
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    count: number = 0

    @OneToMany(() => Chase, (chase) => chase.dog)
    chases: Chase[]

}
