import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/users.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get('/test')
	test() {
		return this.usersService.test();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Get('name/:username')
	async findByName(@Param('username') username: string): Promise<Users[]> {
		return await this.usersService.findByName(username);
	}

	@Get('fetch/:username')
	async fetchByName(@Param('username') username: string): Promise<Users> {
		return await this.usersService.fetchByName(username);
	}

	@Post(':username')
	async create(@Param('username') username: string): Promise<string> {
		return await this.usersService.create(username);
	}

	@Patch(':name')
	update(@Param('name') name: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(name, updateUserDto);
	}

	@Delete(':name')
	remove(@Param('name') name: string) {
		return this.usersService.remove(name);
	}
}
