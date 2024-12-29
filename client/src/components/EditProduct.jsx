import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from "../axiosClient";

export default function EditProduct({ product }) {

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: '',
        stock: ''
    });

    const fetchProduct = async () => {
        const { data: productEdit } = await instanceAxios.get(`/products/${product.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        setForm(productEdit);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await instanceAxios.put(`/products/${product.id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            Swal.fire({
                title: "Success!",
                text: "Product updated successfully",
                icon: "success",
            });
            navigate('/admin/user-view'); // Redirect to another page after successful update
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to update product: ${error.message}`,
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label id="name" name="name" className="input input-bordered flex items-center gap-2">
                Name
                <input id="name" type="text" className="grow" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
            </label>
            <label id="description" name="description" className="input input-bordered flex items-center gap-2">
                Description
                <input id="description" type="text" className="grow" placeholder="Description" name="description" value={form.description} onChange={handleChange} />
            </label>
            <label id="image" name="image" className="input input-bordered flex items-center gap-2">
                Image
                <input id="image" type="text" className="grow" placeholder="input URL" name="image" value={form.image} onChange={handleChange} />
            </label>
            <label id="stock" name="stock" className="input input-bordered flex items-center gap-2">
                Stock
                <input id="stock" type="text" className="grow" placeholder="Stock" name="stock" value={form.stock} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" className="btn" />
        </form>
    );
}