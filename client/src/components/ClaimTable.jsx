import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";
import Swal from "sweetalert2";

export default function ClaimTable() {
    const [claim, setClaim] = useState([])
    const fetchClaim = async () => {
        try {
            const { data } = await instanceAxios.get(`/claims`, {
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

    const claimDone = async (id) => {
        try {
            await instanceAxios.delete(`/claims/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            fetchClaim();
            Swal.fire({
                title: "Success!",
                text: "Claim was completed",
                icon: "success",
            });

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Claim was unsuccessful",
                icon: "error",
            });       
        }
    }

    console.log(claim, "-----this is claim");
    

    useEffect(() => {
        fetchClaim();
    }, []);

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claim.map((claim, idx) => {
                            return (
                                <tr key={claim.id}>
                                    <th>{idx + 1}</th>
                                    <th>{claim.Product.name}</th>
                                    <th>{claim.date}</th>
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
                                    <td>
                                    <input type="submit" onClick={() =>
                                            claimDone(claim.id)
                                        } value="Done" className="btn" />
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