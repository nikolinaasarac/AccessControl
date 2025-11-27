import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { FirebaseModule } from './firebase/firebase.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { GuestsModule } from './guests/guests.module';
import {FirebaseAuthGuard} from "./firebase/guard/firebase.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [ConfigModule.forRoot({cache: true}), FirebaseModule, PostsModule, AuthModule, GuestsModule],
  controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: FirebaseAuthGuard, // <--- globalni guard
		},
	],
})
export class AppModule {}
