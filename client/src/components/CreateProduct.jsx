import Swal from "sweetalert2";

export default function CreateProduct({handleSubmit}) {
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await instanceAxios.post(`/products`, {
    //             name: e.target.name.value,
    //             description: e.target.description.value,
    //             image: e.target.image.value,
    //             stock: e.target.stock.value,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //             }
    //         });
    //         fetchProduct();
    //         Swal.fire({
    //             title: "Success!",
    //             text: "Added product successfully",
    //             icon: "success",
    //         });
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Error!",
    //             text: `Failed to add product ${error}`,
    //             icon: "error",
    //         });
    //     }
    // }
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     Swal.fire({
    //         title: "Success!",
    //         text: "Added product successfully",
    //         icon: "success",
    //     });
    // }

    return <>
        <form action="" onSubmit={handleClick} className="flex flex-col gap-2" >
            <label className="input input-bordered flex items-center gap-2">
                Name
                <input type="text" className="grow" placeholder="Name"  />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Description
                <input type="text" className="grow" placeholder="Description" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Image
                <input type="text" className="grow" placeholder="input URL"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Stok
                <input type="text" className="grow" placeholder="Stok"  />
            </label>

            <input type="submit" value="Submit" className="btn" />

        </form>
    </>
}

// CreateProduct.propTypes = {
//     handleSubmit: PropTypes.func.isRequired
// }