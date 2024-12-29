import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cms from "./pages/Cms";
import ClaimTable from "./components/ClaimTable";
import RootLayoutCms from "./layouts/RootLayoutCms";
import CreateProduct from "./components/CreateProduct";
import UserTable from "./components/UserTable";
import DetailProduct from "./components/DetailProduct";
import ClaimUser from "./components/ClaimUser";
import {jwtDecode} from 'jwt-decode';

// Function to parse JWT to get the payload
const parseJwt = (token) => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            // console.log(access_token, "<<<<<<<access token client");
            if (access_token) {
                // Decode the token to get the payload
                const payloadToken = parseJwt(access_token);
                const role = payloadToken.role; // For get role from payload
                // console.log(payloadToken, "<<<<<<<payload");
                
                if (role !== "Admin") {
                    return null;
                } else {
                    throw redirect("/admin");
                }
            }
            throw redirect("/login");
        },
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "claim",
                element: <ClaimUser />
            },
            {
                path: "detail",
                element: <DetailProduct />
            }
        ]
    },
    {
        path: "/login",
        element: < Login />,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            if (access_token){
                redirect("/");
            }
            return null;
        },
    },
    {
        path: "/admin",
        element: <RootLayoutCms />,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            if (access_token) {
                return null;
            }
            throw redirect("/login");
        },
        children: [
            {
                path: "",
                element: <Cms />
            },
            {
                path: "users",
                element: <UserTable />
            },
            {
                path: "user-view",
                element: <Home />
            },
            {
                path: "products",
                element: <Cms />
            },
            {
                path: "create-product",
                element: <CreateProduct />
            },
            {
                path: "claim-product",
                element: <ClaimTable />
            },
        ]
    }
]);

export const DeclaredRouter = () => {
    return <RouterProvider router={router} />
}