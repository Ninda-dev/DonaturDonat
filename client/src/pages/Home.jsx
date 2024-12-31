import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from "../features/productSlice";
import { instanceAxios } from "../axiosClient";
import Card from "../components/Card";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [answerPrompt, setAnswerPrompt] = useState("");

    const { data } = useSelector((state) => state.product);
    // console.log(data, "=======ini state");

    const dispatch = useDispatch()

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let { data } = await instanceAxios.post('/gemini-ai', { prompt });
            setAnswerPrompt(data)
            // console.log(answerPrompt, "=========ini answer prompt before");

            setPrompt(" ");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    return (
        <>
            <br />
            <br />

            {/* Form AI */}
            <form action="" onSubmit={handleClick} className="flex flex-col gap-2" >
                <label htmlFor="">Bosen nunggu update product ya ? tanyain sesuatu ke AI yukss</label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="ask something to AI" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                </label>
                <input type="submit" value="Submit" className="btn" />
            </form>
            <br />

            {/* Answer AI */}
            <div className="bg-white p-4 rounded-lg shadow-md mx-28">
                {(!answerPrompt)
                    ? // if empty answer
                    <div className="justify-items-center">
                        <p>I'm waiting for you</p>
                        <span className="items-center loading loading-dots loading-xs"></span>
                    </div>
                    : // if filled answer
                    <p>{answerPrompt}</p>
                }
            </div>

            <br />
            <br />

            {/* Card Product */}
            <div className="grid grid-cols-2 gap-8">

                {data.data?.map((product) => {

                    return (
                        <Card
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                image: product.image,
                                stock: product.stock
                            }}
                        />
                    )
                })}

            </div>


        </>
    )
}