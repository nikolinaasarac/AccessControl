import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
	constructor() {}

	@Get('hello')
	getHello(): string {
		return 'Hello from Posts';
	}
}
