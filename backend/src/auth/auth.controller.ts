import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "./dto/userDto";
import {Public} from "../shared/decorators/public.decorator";
import {CurrentUser} from "../shared/decorators/current-user.decorator";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Public()
	@Post('login')
	async login(@Body() userDto: UserDto) {
		return this.authService.login(userDto);
	}

	@Get('me')
	async getMe(@CurrentUser() uid: string) {
		return this.authService.getMe(uid);
	}
	
}
