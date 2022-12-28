import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Profile } from "./Profile";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column({ nullable: true })
    phone: number;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

}
