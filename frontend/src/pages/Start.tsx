import { useEffect, useState } from "react"
import url from "../main";
import Navbar from "../components/Navbar";

const Start = () => {

    const [data, setData] = useState<string>()
    const [pin, setPin] = useState<string>("0000");

    useEffect(() => {
        let subscribed = true;

        const getData = async() => {
            if (subscribed) {
                console.log("fetching data in Start.tsx ...")
                const response = await fetch(url+"/");
                const json = await response.json();
                setData(json.data);
            }
        }
        
        getData();
        console.log(data)
        return () => {
            subscribed = false;
        }
    }, [])

    const handleForm = () => {
        console.log("submitting form...")
    }

    const handleInput = (e:any) => {
        if (e.target.value.length <= 4) {
            setPin(e.target.value)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar/>
            <div className="w-full h-full flex items-center justify-center flex-col p-4">
                
                <form onSubmit={handleForm} method="POST" action={url+"/game"} className="max-w-[320px] max-h-[400px] bg-gray-800 rounded-lg flex items-center justify-center flex-col p-4">
                    <label className="mb-2">Enter Game Pin:</label>
                    <input className="bg-transparent px-2 py-1 text-center" type="text" value={pin} onChange={handleInput}/>
                </form>
            </div>
        </div>
    )
}

export default Start