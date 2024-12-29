import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { instanceAxios } from "../axiosClient";


export default function Card({ product }) {

    const createClaim = async (e) => {
        e.preventDefault();
        try {
            await instanceAxios.post(`/claims/${product.id}`, {
                id: product.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            Swal.fire({
                title: "Success!",
                text: "Product claimed successfully",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to claim product: ${error.message}`,
                icon: "error",
            });
        }
    }

    return (
        <>
            <div className="grid card bg-base-100 w-96 shadow-xl mb-10">
                <figure className="h-80">
                    <img
                        src={product.image}
                        alt="donut" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {product.name}
                        <div className="badge">NEW</div>
                    </h2>
                    <p>Stock : {product.stock}</p>
                    <div className="button-container card-actions justify-end">
                        <div className="button claim badge badge-outline bg-[#560F20] text-white hover:animate-pulse">
                            <Link to={`/claim/${product.id}`} onClick={createClaim}>
                                Claim
                            </Link>
                        </div>
                        <div className="button detail badge badge-outline hover:bg-[#560F20] hover:text-white">
                            <Link to="/detail">
                                Detail
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

Card.propTypes = {
    product: PropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        stock: PropTypes.number
    })
};