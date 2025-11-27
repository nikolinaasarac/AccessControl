'use client';

import React, {createContext, useState, useContext, useEffect, useMemo} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {User} from "@/models/user.model";
import UserService from "@/lib/service/user.service";

interface AuthContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
	isLoggingIn: boolean;
	logout: () => void;
	rehydrateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');

		if (accessToken) {
			rehydrateUser();
		} else {
			setIsLoading(false);
		}
	}, []);

	const rehydrateUser = async () => {
		try {
			const user = await UserService.getCurrentUser();
			setUser(user);
		} catch (error) {
			console.error('Failed to rehydrate user:', error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};


	const logout = () => {
		setUser(null);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		router.push('/login');
	};

	const value = useMemo(
		() => ({user, setUser, isLoading, isLoggingIn, logout, rehydrateUser}),
		[user, isLoading, isLoggingIn]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}