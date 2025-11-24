"use client"
import {auth} from "@/lib/firebase";
import {signInWithCustomToken} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/schemas/loginSchema";

export default function Page() {
	const router = useRouter();
	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const logIn = async (data: { email: string; password: string }) => {
		try{
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({email: data.email, password: data.password})
			})

			if(!res.ok){
				throw new Error('Login failed.');
			}
			const { token } = await res.json();
			localStorage.setItem("accessToken", token);
			await signInWithCustomToken(auth, token);
			router.push("/");
		}
		catch(err){
			console.log("Neispravni podaci za prijavu");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex items-center gap-2 py-4">
					<img
						src="/secure-login.png"
						alt="Logo"
						className="w-20 h-auto"
					/>
					<div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-700">
                    Safe Entry
                </span>
						<span className="text-sm text-gray-400 italic">
                    Your Security, Our Responsibility
                </span>
					</div>
				</div>
				<h1 className="text-3xl font-bold text-gray-700 mb-6 mx-auto">Login</h1>
				<form onSubmit={handleSubmit(logIn)} className="w-full flex flex-col gap-4">
					<div className="w-full flex flex-col justify-center h-full">
						<label htmlFor="email" className="my-2">Email address</label>
						<input
							type="email"
							{...register("email")}
							className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Enter email..."
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="my-2">Password</label>
						<input
							type="password"
							{...register("password")}
							className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Enter password..."
						/>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>
					<button className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-md
            hover:bg-blue-600 hover:cursor-pointer"
							type="submit">
					Log in</button>
				</form>
			</div>
		</div>
	);
}