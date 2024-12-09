import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function TableProduct({ post, handleDelete }) {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Post</h1>
                        <Link to="/admin/createPost" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                            <i className="fas fa-plus mr-2"></i>
                            New Post
                        </Link>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="w-full bg-gray-200 text-left">
                                <th className="py-2 px-4">Id</th>
                                <th className="py-2 px-4">Title</th>
                                <th className="py-2 px-4">Content</th>
                                <th className="py-2 px-4">Image</th>
                                <th className="py-2 px-4">CategoryId</th>
                                <th className="py-2 px-4">AuthorId</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">{post.id}</td>
                                <td className="py-2 px-4 font-bold">{post.title}</td>
                                <td className="py-2 px-4">{post.content}</td>
                                <td className="py-2 px-4">
                                    <img
                                        alt="Post picture"
                                        className="w-20 h-20 object-cover"
                                        height={100}
                                        src={post.imgUrl}
                                        width={100}
                                    />
                                </td>
                                <td className="py-2 px-4">{post.categoryId}</td>
                                <td className="py-2 px-4 font-bold">{post.authorId}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button className="text-red-500" onClick={handleDelete(post.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <button className="text-blue-500">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-pink-500">
                                        <i className="fas fa-image"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

PostTable.propTypes = {
    post: PropTypes.exact({
        id: PropTypes.number,
        title: PropTypes.string,
        imgUrl: PropTypes.string,
        content: PropTypes.string,
        categoryId: PropTypes.number,
        authorId: PropTypes.number
    }),
    handleDelete: PropTypes.func
};