import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TweetsService } from './tweets.service';
import { Tweets } from './schemas/tweets.schema';
import { Users } from '../users/schemas/users.schema';

@Controller('tweets')
export class TweetsController {
	constructor(
		private readonly usersService: UsersService,
		private readonly tweetsService: TweetsService
	) {
	}
	
	@Get()
	async findAll(): Promise<Tweets[]> {
		return await this.tweetsService.findAll();
	}
	
	@Get('fetch')
	async findTweets(@Body() args: object) {
		try {
			const tweetsList = await this.tweetsService.findTweets(args);
			return JSON.parse(<string>tweetsList);
		} catch (err) {
			return err;
		}
	}
	
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Tweets> {
		return await this.tweetsService.findOne(id);
	}
	
	
	@Get('user/:name')
	async findByName(@Param('name') name: string): Promise<Tweets[]> {
		let user: Users[] = await this.usersService.findByName(name);
		let userFound = user.pop();
		return await this.tweetsService.findByUserId(userFound['uid_str']);
	}
	
	@Post()
	async create(@Body() tweets: Tweets): Promise<Tweets> {
		return await this.tweetsService.create(tweets);
	}
	
	@Put(':id')
	async update(@Param('id') id: string, @Body() tweets: Tweets): Promise<Tweets> {
		return await this.tweetsService.update(id, tweets);
	}
	
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<Tweets> {
		return await this.tweetsService.delete(id);
	}
	
}
