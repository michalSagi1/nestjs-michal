import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserPostDTO, CreateUserProfileDTO, CreateUsersDTO } from './create-users.dto';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    async getUsers() {
        return this.userRepository.find({ relations: ['posts', 'profile'] })
    }
    async getRandomUser() {
        const randomUser = await this.userRepository
            .createQueryBuilder("users")
            .select()
            .orderBy('RAND()')
            .getOne()



        console.log(randomUser);
        return randomUser

    }

    getUserById(id: number) {
        const user = this.userRepository.findOne({
            where:
                { id },
            relations: ['posts', 'profile']
        })
        return user
    }

    createUser(createUsersDTO: CreateUsersDTO) {
        const newUser = this.userRepository.create({ ...createUsersDTO })
        return this.userRepository.save(newUser);
    }
    updateUser(id: number, createUsersDTO: CreateUsersDTO) {
        const upUser = this.userRepository.update({ id }, { ...createUsersDTO })
        return upUser;


    }
    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({
            where:
                { id }
        })
        if (!user) {
            return 'USER NOT FOUND'
        }
        this.userRepository.delete({ id })
        return 'User is deleted'



    }

    async createUserPost(id: number, createUserPostDTO: CreateUserPostDTO) {
        const user = await this.userRepository.findOne({
            where:
                { id }
        })
        if (!user) {
            return 'USER NOT FOUND'
        }

        const newPost = this.postRepository.create({ ...createUserPostDTO, user, });
        return await this.postRepository.save(newPost);

    }
    async createUserProfile(id: number, createUserProfileDTO: CreateUserProfileDTO) {
        const user = await this.userRepository.findOne({
            where:
                { id }
        })
        if (!user) {
            return 'USER NOT FOUND'
        }

        const newProfile = this.profileRepository.create(createUserProfileDTO);
        const saveProfile = await this.profileRepository.save(newProfile);
        user.profile = saveProfile
        return this.userRepository.save(user)
    }
}
