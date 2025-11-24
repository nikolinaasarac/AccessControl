import { Injectable } from '@nestjs/common';
import {FirebaseService} from "../firebase/firebase.service";


@Injectable()
export class PostsService {
	constructor(private firebaseRepository: FirebaseService) {}
}