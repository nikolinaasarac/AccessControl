export interface User {
	uid: string;
	email: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}