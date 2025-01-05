import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { instanceAxios } from "../axiosClient";
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            let response = await instanceAxios.post(
                "/login",
                {
                    email,
                    password,
                }
            );

            // console.log(response, "----------");

            localStorage.setItem("access_token", response.data.access_token);
            // console.log("masuk ga nih#############");

            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    };

    return (
        <div className="justify-center" style={{
            backgroundImage: 'url(https://i.pinimg.com/1200x/b3/19/d7/b319d751c514c37af2a22dc15c86ac5f.jpg)', // Use url() function
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="mt-20 p-10 bg-white rounded-lg shadow-xl items-center">
                <h1 className="text-3xl text-center font-bold mb-4">Register</h1>
                <p className="text-center mb-14">Create an account first to claim your donuts</p>
                <div className="flex flex-col items-center w-auto">
                    <div className="w-72">
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    placeholder="Enter email address ..."
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    placeholder="Enter your password ..."
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full mt-4 bg-[#C75C71] text-1xl py-2 rounded-lg hover:bg-pink-700 hover:text-white">
                                Regis
                            </button>
                        </form>
                    </div>

                    <div className="mt-3">
                        <p className="text-sm font-light text-brown-400">
                            Already have an account ?
                            <Link
                                to="/login"
                                className="font-medium text-[977458ff] hover:text-[#ffffff] hover:bg-[#ECB1C0] hover:rounded-sm"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}