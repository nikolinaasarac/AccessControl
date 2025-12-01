import { Module } from '@nestjs/common';
import {FirebaseModule} from "../firebase/firebase.module";
import {OtcsService} from "./otcs.service";
import {OtcsController} from "./otcs.controller";

@Module({
	imports: [FirebaseModule],
	controllers: [OtcsController],
	providers: [OtcsService]
})
export class OtcsModule {}
