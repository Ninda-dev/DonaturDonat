import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCookie, faPenToSquare, faUsers } from '@fortawesome/free-solid-svg-icons';


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
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <span className="font-medium">User List</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user-view">
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <i className="fa fa-eye"></i>
                                    </div>
                                    <span className="font-medium">User View</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products">
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <FontAwesomeIcon icon={faCookie} />
                                    </div>
                                    <span className="font-medium">Product</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/create-product">
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <FontAwesomeIcon icon={faSquarePlus} />
                                    </div>
                                    <span className="font-medium">Create Product</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/claim-product">
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                    <span className="font-medium">Claim Product</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}>
                                <div className="flex items-left pl-2 gap-4">
                                    <div className="w-6 ml-1 items-left">
                                        <i className="fa fa-sign-out-alt"></i>
                                    </div>
                                    <span className="font-medium">Logout</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}