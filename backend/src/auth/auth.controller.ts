import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "./dto/userDto";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	async login(@Body() userDto: UserDto) {
		return this.authService.login(userDto);
	}
	
}
