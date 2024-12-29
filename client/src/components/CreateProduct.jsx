import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from "../axiosClient";

export default function CreateProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: '',
        stock: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await instanceAxios.post('/products', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            Swal.fire({
                title: "Success!",
                text: "Product added successfully",
                icon: "success",
            });
            navigate('/admin'); // Redirect to another page after successful submission
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to add product: ${error.message}`,
                icon: "error",
            });
        }
    };

    return <>
        <h1 className="text-2xl font-semibold text-gray-800">Create Product</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2" >
            <label className="input input-bordered flex items-center gap-2">
                Name
                <input type="text" className="grow" placeholder="Name" name="name" value={form.name} onChange={handleChange}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Description
                <input type="text" className="grow" placeholder="Description" name="description" value={form.description} onChange={handleChange}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Image
                <input type="text" className="grow" placeholder="input URL" name="image" value={form.image} onChange={handleChange}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Stok
                <input type="text" className="grow" placeholder="Stok" name="stock" value={form.stock} onChange={handleChange}/>
            </label>

            <input type="submit" value="Submit" className="btn" />

        </form>
    </>
}