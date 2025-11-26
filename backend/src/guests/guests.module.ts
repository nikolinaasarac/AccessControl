import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import {FirebaseModule} from "../firebase/firebase.module";

@Module({
	imports: [FirebaseModule],
	controllers: [GuestsController],
  providers: [GuestsService]
})
export class GuestsModule {}
