import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { instanceAxios } from "../axiosClient";
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState("admin@mail.com");
    const [password, setPassword] = useState("admin");
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


    useEffect(() => {
        google.accounts.id.initialize({
            // fill this with your own client ID
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            // callback function to handle the response
            callback: async (response) => {
                // console.log("Encoded JWT ID token: " + response.credential)
                const { data } = await instanceAxios.post('/auth/google', {
                    googleToken: response.credential,
                });

                localStorage.setItem('access_token', data.access_token);

                // navigate to the home page or do magic stuff
                navigate('/')
            }
        });
        google.accounts.id.renderButton(
            // HTML element ID where the button will be rendered
            // this should be existed in the DOM
            document.getElementById('buttonDiv'),
            // customization attributes
            { theme: 'outline', size: 'large' },
        );
        // to display the One Tap dialog, or comment to remove the dialog

        google.accounts.id.prompt();
    }, []);

    return (
        <>
            <div className="ml-60 mt-10 mr-60">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <p className="mb-8">Log in to claim your donuts..</p>
                <div className="flex">
                    <div className="w-1/2 mt-5">
                        <img
                            alt="Valentine Donut"
                            className="rounded-lg shadow-md"
                            height={140}
                            src="image/donut valentine.jpeg"
                            width={430}
                        />
                    </div>
                    <div className="w-1/2 pl-10">
                        <h2 className="text-2xl font-bold my-6">Log in to your account</h2>
                        <p className="mb-4">Enter your email and password to login.</p>
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
                            <button type="submit" className="w-full mt-6 bg-[#C75C71] text-1xl py-2 rounded-lg hover:bg-pink-700 hover:text-white">
                                Log In
                            </button>
                        </form>



                        <button
                            id="buttonDiv"
                            type="button"
                            className=" mt-5 w-full bg-[#ECB1C0] text-[#fef7f1ff] py-2 rounded-lg shadow-lg hover:bg-brown-600 flex items-center justify-center"
                        >
                            <img
                                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                                alt="Google Logo"
                                className="w-5 h-5 mr-2"
                            />
                            Sign in with Google
                        </button>

                        {/* Register */}
                        <div className="mt-3">
                            <p className="text-sm font-light text-brown-400">
                                No Account?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-[977458ff] hover:text-[#ffffff] hover:bg-[#ECB1C0] hover:rounded-sm"
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}