import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "./dto/userDto";
import {FirebaseAuthGuard} from "../firebase/guard/firebase.guard";
import {Public} from "../shared/decorators/public.decorator";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Public()
	@Post('login')
	async login(@Body() userDto: UserDto) {
		return this.authService.login(userDto);
	}

	@UseGuards(FirebaseAuthGuard)
	@Get('me')
	async getMe(@Req() req) {
		return this.authService.getMe(req.user.uid);
	}
	
}
