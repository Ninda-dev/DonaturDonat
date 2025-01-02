import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { instanceAxios } from "../axiosClient";
import { useDispatch } from "react-redux";
import { fetchClaims } from "../features/claimSlice";
import { use } from "react";
import { fetchProducts } from "../features/productSlice";

export default function Card({ product }) {

    const dispatch = useDispatch();

    const createClaim = async (e) => {
        e.preventDefault();
        try {
            const addClaim = await instanceAxios.post(`/claims/${product.id}`,
                {
                    id: product.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            );

            console.log(addClaim, "<<<<<<<<<<<<ini add claim");

            dispatch(fetchClaims());

            // console.log(product.id, "<<<<<<<<<<<<ini product id");

            // get product by id to get stock
            const productId = product.id;
            console.log(productId, "<<<<<<<<<<<<==========ini product id");

            const productById = await instanceAxios.get(`products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            // console.log(productById, "<<<<<<<<<<<<ini product detail");

            if (productById) {

                let stock = productById.data.data[0].stock;

                let newStock = stock - 1;
                // console.log(stock, "<<<<<<<<<<<<ini stock baru");

                // for update stock product until claimed
                const productUpdate = await instanceAxios.put(`products/${productId}`,
                    {
                        name: productById.data.name,
                        description: productById.data.description,
                        image: productById.data.image,
                        stock: newStock
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                );

                dispatch(fetchProducts());

                console.log(productUpdate, "<<<<<<<<<<<<ini product update");

                if (productUpdate.status === 200 && newStock === 0) {

                    const claimStatus = await instanceAxios.get(`claims/product/${productId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`
                        }
                    });

                    if (claimStatus.data.data.length === 0) {
                        // delete product if stock is 0
                        await instanceAxios.delete(`products/${productId}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`
                            }
                        });

                        dispatch(fetchProducts());
                    }

                    dispatch(fetchProducts());
                }
            }

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

    const outOfStock = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Out of Stock",
            text: "Sorry this product is out of stock, please check another product",
            icon: "info",
        });
    }

    return (
        <>
            {(product.stock !== 0)
                ?
                < div className="grid card bg-base-100 w-96 shadow-xl mb-10">
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
                                <Link to={`products/${product.id}`} onClick={createClaim}>
                                    Claim
                                </Link>
                            </div>
                            <div className="button detail badge badge-outline hover:bg-[#560F20] hover:text-white">
                                <Link to={`/detail/${product.id}`} >
                                    Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
                :
                < div className="grid card bg-base-100 w-96 shadow-xl mb-10">
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
                                <Link to={`#`} onClick={outOfStock}>
                                    Out of Stock
                                </Link>
                            </div>
                            <div className="button detail badge badge-outline hover:bg-[#560F20] hover:text-white">
                                <Link to={`/detail/${product.id}`} >
                                    Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
            }
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