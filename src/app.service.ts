import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHome(): object {
		return { title: 'Hello from twitter page' };
	}
}
