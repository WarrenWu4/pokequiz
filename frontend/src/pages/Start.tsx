import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import url from "../main";
import Navbar from "../components/Navbar";

const Start = () => {
    const [data, setData] = useState<string>("");
    const [pin, setPin] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        let subscribed = true;

        const getData = async () => {
            if (subscribed) {
                console.log("fetching data in Start.tsx ...");
                const response = await fetch(url + "/");
                const json = await response.json();
                setData(json.data);
            }
        };

        getData();
        console.log(data);
        return () => {
            subscribed = false;
        };
    }, []);

    const handleForm = () => {
        navigate("/game/" + pin);
    };

    const handleInput = (e: any) => {
        if (e.target.value.length <= 4) {
            setPin(e.target.value);
        }
    };

    return (
<<<<<<< HEAD
        <div className="w-screen h-screen flex flex-col">
            <Navbar/>
            <div className="w-full h-full flex items-center justify-center flex-col p-4">
                
                <form onSubmit={handleForm} method="POST" action={url+"/validate"} className="max-w-[320px] max-h-[400px] bg-gray-800 rounded-lg flex items-center justify-center flex-col p-4">
                    <label className="mb-2">Enter Game Pin:</label>
                    <input className="bg-transparent px-2 py-1 text-center" type="text" name="pin" value={pin} onChange={handleInput}/>
                </form>
=======
        <div className="w-screen h-screen flex flex-col bg-[url('bg-overlay.png')] bg-center bg-no-repeat bg-cover">
            <div className="w-full h-full flex flex-col">
                <Navbar />
                <div className="absolute w-full h-full flex items-center justify-center flex-col p-4 ">
                    <form
                        onSubmit={handleForm}
                        method="POST"
                        action={url + "/validate"}
                        className="bg-gradient-to-b from-[#5A6988] from-[53%] to-[#3A4466] to-[47%] rounded-sm flex items-center justify-center flex-col p-12 gap-y-4"
                    >
                        <img
                            src="/tree.png"
                            className="w-[181.56px] h-[207.5px]"
                        />
                        <label className="text-center font-bold text-3xl">
                            Enter Game Pin:
                        </label>
                        <input
                            className="px-5 py-1 bg-[#3A4466] text-center rounded-sm placeholder-gray placeholder-opacity-50 select-none text-gray-700 border-4"
                            type="text"
                            value={pin}
                            onChange={handleInput}
                        />
                    </form>
                </div>
>>>>>>> 83385fc04e9181ac48a653e015567ddcb1a395c7
            </div>
        </div>
    );
};

export default Start;
