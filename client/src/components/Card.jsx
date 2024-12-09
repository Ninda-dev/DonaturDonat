import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({ product }) {
    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl mb-10">
                <figure>
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
                            <Link to={`/claim/${product.id}`}>
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