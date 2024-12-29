import { Link, Outlet, useNavigate } from "react-router-dom";


export default function RootLayoutCms() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            navigate("/admin-products"); //redirect to admin-product before remove access token because page which need access token will show notification failed to load data if access token removed first
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
                            <Link to={"/admin"}>
                                <span className="ml-2 text-xl font-bold">Donat<span style={{ color: "#FF748B" }}>ur</span>Donat</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">User List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user-view">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">User View</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/create-product">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">Create Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/claim-product">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">Claim Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span className="mx-4 font-medium">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}