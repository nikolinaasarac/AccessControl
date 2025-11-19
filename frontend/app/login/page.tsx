"use client"
import {useState} from "react";
import {auth} from "@/lib/firebase";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {useRouter} from "next/router";

export default function Page() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function logIn(){
        try{
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            console.log("Neispravni podaci za prijavu");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <div className="w-full flex flex-col max-w-sm bg-white p-6 rounded-xl shadow-md">
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
        <div className="w-full flex flex-col justify-center h-full">
            <label htmlFor="email" className="my-2">Email address</label>
            <input type="email" value={email}
                   className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="w-full flex flex-col justify-center h-full">
            <label className="my-2" htmlFor="password">Password</label>
            <input type="password" value={password}
                   className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-md
            hover:bg-blue-600 hover:cursor-pointer"
                onClick={logIn}>Log in</button>
        </div>
        </div>);
}