import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cms from "./pages/Cms";
import SideBar from "./components/SideBar";
import ClaimTable from "./components/ClaimTable";
import RootLayoutCms from "./layouts/RootLayoutCms";
import CreateProduct from "./components/CreateProduct";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
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
            if (access_token) {
                throw redirect("/");
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
                path: "create-product",
                element: <CreateProduct/>
            }
        ]
    }
    // {
    //     path: "createPost",
    //     element: <CreatePost />
    // },
    // {
    //     path: "categories",
    //     element: <ShowCategory />
    // },
    // {
    //     path: "updateImagePost",
    //     element: <UpdatePostImage />
    // }
    //     ]
    // }
]);

export const DeclaredRouter = () => {
    return <RouterProvider router={router} />
}