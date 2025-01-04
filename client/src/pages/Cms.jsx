import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";
import Swal from 'sweetalert2';
import EditProduct from "../components/EditProduct";
import { Navigate } from "react-router-dom";

export default function Cms() {
    const [product, setProduct] = useState([])
    const fetchProduct = async () => {
        try {
            const { data } = await instanceAxios.get(`/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            setProduct(data.data);

        } catch (error) {

            Swal.fire({
                title: "Error!",
                text: "Failed to show product",
                icon: "error",
            });

        }
    }

    //for edit product
    const [editingProduct, setEditingProduct] = useState(null);

    const [click, setClick] = useState(false);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setClick(true);
    };

    const handleEditSuccess = () => {
        fetchProduct();
        setClick(false);
        Navigate('/admin/user-view');
    };

    //for delete product
    const handleDelete = async (id) => {
        try {
            await instanceAxios.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            fetchProduct();
            Swal.fire({
                title: "Success!",
                text: "Deleted product successfully",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to delete product ${error}`,
                icon: "error",
            });
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-center text-2xl font-bold">Product List</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Description</th>
                            <th>Image</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, idx) => {
                            return (
                                <tr key={product.id}>
                                    <th>{idx + 1}</th>
                                    <th>{product.name}</th>
                                    <th>{product.description}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-24">
                                                <img src={product.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.stock}</td>
                                    <td>

                                        <input type="submit"
                                            onClick={() => handleEdit(product)}
                                            value="Edit" className="btn" />
                                        {(click && editingProduct && editingProduct.id === product.id)
                                            ?
                                             <EditProduct product={editingProduct} onEditSuccess={handleEditSuccess} />
                                            :
                                            null
                                        }

                                        <input type="submit" onClick={() =>
                                            handleDelete(product.id)
                                        } value="Delete" className="btn" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}