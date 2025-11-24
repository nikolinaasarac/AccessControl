import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {FirebaseService} from "./firebase/firebase.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private firebaseService: FirebaseService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

	@Get('test-firebase')
	async testFirebase() {
		return await this.firebaseService.testConnection();
	}
}
