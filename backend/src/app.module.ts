import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { FirebaseModule } from './firebase/firebase.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule.forRoot({cache: true}), FirebaseModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
