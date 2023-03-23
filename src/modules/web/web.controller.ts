import { Controller, Get, Param, Render } from '@nestjs/common';
import { WebService } from './web.service';
import { UsersService } from '@users/users.service';
import { Users } from '@users/schemas/users.schema';
import { TweetsService } from '@tweets/tweets.service';

@Controller('web')
export class WebController {
	constructor(
		private readonly homeService: WebService,
		private readonly usersService: UsersService,
		private readonly tweetsService: TweetsService
	) {
	}

	@Get()
	@Render('home')
	showWebPage() {
		return { title: 'Hello from twitter page' };
	}

	@Get('tweets/:name')
	@Render('tweets')
	async showTweetsPage(@Param('name') name: string) {
		try {
			let user: Users[] = await this.usersService.findByName(name);
			let users: Users[] = await this.usersService.findAll();
			let userFound = user.pop();
			let tweets = await this.tweetsService.findByUserId(userFound['uid_str']);
			return {
				allUsers: users,
				user: userFound,
				screen_name: userFound['screen_name'],
				tweets: tweets
			};
		} catch (err) {
			return err;
		}
	}

	@Get('users/')
	@Render('users')
	async showUsersPage() {
		try {
			let users: Users[] = await this.usersService.findAll();
			return {
				allUsers: users
			};
		} catch (err) {
			return err;
		}
	}

	@Get('about')
	@Render('about')
	showAboutPage() {
		return { title: 'Hello from about page' };
	}
}
