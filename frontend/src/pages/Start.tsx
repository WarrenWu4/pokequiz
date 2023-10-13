import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import url from "../main";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
        <div className="w-screen h-screen flex flex-col bg-[url('./stolen-image.png')] bg-center bg-no-repeat bg-cover">
            <div className="w-full h-full flex flex-col backdrop-blur-sm">
                <Navbar />
                <div className="absolute w-full h-full flex items-center justify-center flex-col p-4">
                    <form
                        onSubmit={handleForm}
                        method="POST"
                        action={url + "/validate"}
                        className="max-w-[320px] max-h-[400px] bg-white rounded-md flex items-center justify-center flex-col p-4 gap-y-4 shadow-lg border"
                    >
                        <input
                            placeholder="Game PIN"
                            className="px-2 py-1 text-center bg-white rounded-md border placeholder-gray placeholder-opacity-50 select-none"
                            type="text"
                            value={pin}
                            onChange={handleInput}
                        />
                        <Link
                            to={"/game/" + pin}
                            className="w-full h-full bg-red-500 rounded-md border-gray flex justify-center items-center"
                        >
                            <button type="submit" className="px-2 py-1">
                                Enter
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Start;
