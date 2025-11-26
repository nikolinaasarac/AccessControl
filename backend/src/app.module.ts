import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { FirebaseModule } from './firebase/firebase.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [ConfigModule.forRoot({cache: true}), FirebaseModule, PostsModule, AuthModule, GuestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
