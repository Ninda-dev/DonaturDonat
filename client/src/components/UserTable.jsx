import { useEffect, useState } from "react";
import { instanceAxios } from "../axiosClient";
import Swal from 'sweetalert2';

export default function UserTable() {

    const [user, setUser] = useState([])
    const fetchUsers = async () => {
        try {
            const { data } = await instanceAxios.get('/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            setUser(data);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to show users",
                icon: "error",
            });
        }
    }

    const handleDelete = async (id) => {
        try {
            await instanceAxios.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            fetchUsers();
            Swal.fire({
                title: "Success!",
                text: "Deleted user successfully",
                icon: "success",
            });
        } catch (error) {
            if (error.response.status === 400 && error.response.data === 'Cannot delete users who have product claims') {                
                Swal.fire({
                    title: "Error!",
                    text: "Cannot delete users who have product claims",
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete user ${error}`,
                    icon: "error",
                });
            }
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-center text-2xl font-bold">User List</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, idx) => {
                            return (
                                <tr key={user.id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <input type="submit" onClick={() =>
                                            handleDelete(user.id)
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