import { useEffect, useState } from "react"
import url from "../main";
import Navbar from "../components/Navbar";

const WaitingRoom = () => {
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
        <div className="bg-[url('/public/bg-image.png')] bg-no-repeat bg-cover ">
        <div className="w-screen h-screen flex flex-col backdrop-blur-[1.5px] bg-black/60 ">
            <Navbar/>
            <div className="w-[288px] h-[218.37px] mx-auto bg-contain bg-[url(/public/woodenSignRef-1.png)]">
                {/* <img src="/public/woodenSignRef-1.png" alt="Description" className="w-full h-full object-contain" ></img> */}
                
            </div>
            <div className=" absolute bottom-0 w-full bg-black">
                h2
            </div>
            
        </div>
        </div>
    )
}
 export default WaitingRoom;