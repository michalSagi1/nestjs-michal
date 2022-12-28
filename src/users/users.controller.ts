import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserPostDTO, CreateUserProfileDTO, CreateUsersDTO } from './create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }
    @Get()
    async getUsers() {
        const users = await this.userService.getUsers()
        return users;
    }
    @Get('user/random')

    async getRandom() {
        return await this.userService.getRandomUser()
    }
    @Get(':id')
    async getUserBtId(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            return "NO USER"
        }
        return user;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUsersDTO) {
        const newUser = await this.userService.createUser(createUserDto);
        return {
            message: 'User has been submitted successfully!',
            user: newUser,
        };
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUsersDTO) {
        const user = await this.userService.getUserById(id)
        if (!user) {
            return "NO USER"
        }
        const upUser = await this.userService.updateUser(id, createUserDto)
        return {
            message: 'User has been submitted successfully!',
            user: upUser,
        };
    }
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {

        return await this.userService.deleteUser(id)
    }

    @Post(':id/posts')
    createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPost: CreateUserPostDTO
    ) {
        return this.userService.createUserPost(id, createUserPost)
    }
    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfile: CreateUserProfileDTO
    ) {
        return this.userService.createUserProfile(id, createUserProfile)
    }
}
