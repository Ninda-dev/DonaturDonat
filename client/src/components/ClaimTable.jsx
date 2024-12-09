import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";

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
    useEffect(() => {
        fetchClaim();
    }, []);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>UserId</th>
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
                                    <th>{claim.date}</th>
                                    <td>{claim.UserId}</td>
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