import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chase } from "./Chase";

@Entity({ name: 'cats' })
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 9 })
    soul: number

    @OneToMany(() => Chase, (chase) => chase.cat)
    chases: Chase[]

}
