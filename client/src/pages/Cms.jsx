import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";
import Swal from 'sweetalert2';
import CreateProduct from "../components/CreateProduct";

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
            // console.log(claim, "------");


        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to show product",
                icon: "error",
            });
        }
    }

    const handleEdit = async (id) => {
        console.log(id, "------");
        const { data } = await instanceAxios.get(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        console.log(data, "------");    
        setProduct(data);   


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await instanceAxios.post(`/products`, {
                name: e.target.name.value,
                description: e.target.description.value,
                image: e.target.image.value,
                stock: e.target.stock.value,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            fetchProduct();
            Swal.fire({
                title: "Success!",
                text: "Added product successfully",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to add product ${error}`,
                icon: "error",
            });
        }
    }

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
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
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
                                        <input type="submit" onClick={() =>
                                            handleEdit(product.id)
                                        } value="Edit" className="btn" />
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