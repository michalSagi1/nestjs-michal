import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'profils' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string

}