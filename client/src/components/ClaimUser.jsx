import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";
import { jwtDecode } from "jwt-decode";

export default function ClaimUser() {
    const [claim, setClaim] = useState([])
    const fetchClaim = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const payload = jwtDecode(token);
            // console.log(payload, "<<<<<<<<<payload");

            const { data } = await instanceAxios.get(`/claims/${payload.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            // console.log(data, "<<<<<<<<<data saja");
            // console.log(data.data, "<<<<<<<<<data");
            setClaim(data.data);
            // console.log(claim, "-----this is claim");

        } catch (error) {
            console.log(error);
        }
    }

    // console.log(claim, "-----this is claim");


    useEffect(() => {
        fetchClaim();
    }, []);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-800">Claim Product List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>UserId</th>
                            <th>Email</th>
                            <th>ProductId</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claim.map((claim, idx) => {
                            return (
                                <tr key={claim.id}>
                                    <th>{idx + 1}</th>
                                    <th>{claim.Product.name}</th>
                                    <th>{new Date(claim.date).toLocaleDateString("id-ID", options)}</th>
                                    <td>{claim.UserId}</td>
                                    <td>{claim.User.email}</td>
                                    <td>{claim.ProductId}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-24">
                                                <img src={claim.Product.image} />
                                            </div>
                                        </div>
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
