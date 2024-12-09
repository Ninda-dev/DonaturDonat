import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {

    const handleLogout = () => {
        localStorage.removeItem("access_token");
    };

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button ">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <span className="ml-2 text-xl font-bold">DonaturDonat</span>
                        </li>
                        <li>
                            <Link to="/admin">
                                <i className="fas fa-box-open"></i>
                                <span className="mx-4 font-medium">Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} onClick={handleLogout}
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