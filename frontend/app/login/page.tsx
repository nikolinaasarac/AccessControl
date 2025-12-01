"use client"

import {useRouter} from "next/navigation";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {loginSchema} from "@/schemas/login.schema";
import {toast} from "sonner";


export default function Page() {
	const router = useRouter();

	const logIn = async (values: { email: string; password: string }) => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(values),
			});

			if (!res.ok) {
				toast.error("Incorrect email or password");
				return
			}

			const {token} = await res.json();
			localStorage.setItem("accessToken", token);
			toast.success("Login successful!");
			router.push("/guests");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
			<div
				className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex items-center gap-2 py-4">
					<img src="/secure-login.png" alt="Logo" className="w-20 h-auto"/>
					<div className="flex flex-col">
						<span className="text-3xl font-bold text-gray-700">Safe Entry</span>
						<span className="text-sm text-gray-400 italic">
              Your Security, Our Responsibility
            </span>
					</div>
				</div>
				<h1 className="text-3xl font-bold text-gray-700 mb-6 mx-auto">Login</h1>

				<Formik
					initialValues={{email: "", password: ""}}
					validationSchema={loginSchema}
					onSubmit={logIn}
					onError={() => {
						toast.error("Please fill in all required fields correctly");
					}}
				>
					{({isSubmitting, errors, touched}) => (
						<Form className="w-full flex flex-col gap-4">
							<div className="w-full flex flex-col justify-center h-full">
								<label htmlFor="email" className="my-2">
									Email address
								</label>
								<Field
									type="email"
									name="email"
									placeholder="Enter email..."
									className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 
          							${errors.email && touched.email
										? "border-red-500 focus:ring-red-400"
										: "border-gray-300 focus:ring-blue-400"}`}
								/>
								<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage
									name="email"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
								</div>
							</div>

							<div className="flex flex-col">
								<label htmlFor="password" className="my-2">
									Password
								</label>
								<Field
									type="password"
									name="password"
									placeholder="Enter password..."
									className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 
         							${errors.password && touched.password
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"}`}/>
								<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage
									name="password"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
								</div>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer"
							>
								Log in
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}