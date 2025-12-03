"use client"

import {useRouter} from "next/navigation";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {loginSchema} from "@/schemas/login.schema";
import {toast} from "sonner";
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";
import {Button} from "@/components/ui/button";
import {LoadingButton} from "@/components/LoadingButton";


export default function Page() {
	const router = useRouter();
	const {user, isLoading, setUser, login} = useAuth();


	const handleLogin = async (values: any, { setSubmitting }: any) => {
		try {
			await login(values.email, values.password);
		} catch {
			toast.error("Login failed");
		} finally {
			setSubmitting(false);
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
					onSubmit={handleLogin}
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

							<LoadingButton
								type="submit"
								disabled={isSubmitting}
								className="w-full mt-5 text-white px-4 py-2 rounded-md hover:cursor-pointer"
							>
								Log in
							</LoadingButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}