import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cms from "./pages/Cms";
import ClaimTable from "./components/ClaimTable";
import RootLayoutCms from "./layouts/RootLayoutCms";
import CreateProduct from "./components/CreateProduct";
import UserTable from "./components/UserTable";

// Function to parse JWT to get the payload
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            console.log(access_token, "<<<<<<<access token client");
            if (access_token) {
                // Decode the token to get the payload
                const decodedToken = parseJwt(access_token);
                const role = decodedToken.role; // For get role from payload
                console.log(role, "<<<<<<<role client");
                
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
                path: "claim/:id",
                element: <ClaimTable />
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
            }
        ]
    }
]);

export const DeclaredRouter = () => {
    return <RouterProvider router={router} />
}