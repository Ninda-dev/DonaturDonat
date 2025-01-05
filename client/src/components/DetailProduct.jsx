import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { fetchDetailProduct } from "../features/productSlice";
import { useEffect } from "react";


export default function DetailProduct() {
    const { id } = useParams();
    // console.log(id, "=======ini product id");

    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.product.detail);
    // console.log(productDetail, "=======ini product detail");


    useEffect(() => {
        if (id) {
            dispatch(fetchDetailProduct(id));
        }
    }, [dispatch, id]);

    // console.log(productDetail, "=======ini product detail");

    const cardStyle = {
        width: '50vw',
        margin: '0 auto',
    };

    const imgStyle = {
        width: '100%',
        height: '40vh',
        objectFit: 'cover',
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-10">Product Detail</h1>
            {/* Data JSON product detail */}
            {/* <pre>{JSON.stringify(productDetail, null, 2)}</pre> */}

            {productDetail.data?.map((product) => {
                return (
                    <>
                        <div style={cardStyle} className="card bg-base-100 image-full w-96 shadow-xl ">
                            <figure className="w-full h-full">
                                <img
                                    src={product.image}
                                    alt="Product Image"
                                    style={imgStyle} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end">
                                    <Link to="../" className="btn btn-primary">Back</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}