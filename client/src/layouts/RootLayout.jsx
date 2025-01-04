import { Link, Outlet, redirect, useNavigate } from "react-router-dom";


export default function RootLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            navigate("/");
            localStorage.removeItem("access_token");
            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <Link to={"/"}>
                                <span className="ml-2 text-xl font-bold">Donat<span style={{ color: "#FF748B" }}>ur</span>Donat</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/claim"}>
                                <i className="fa fa-sign-out-alt"></i>
                                <span className="mx-4 font-medium">Claim</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/location"}>
                                <i className="fa fa-sign-out-alt"></i>
                                <span className="mx-4 font-medium">Find Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out-alt"></i>
                                <span className="mx-4 font-medium">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}