import { useState } from "react";
import Navbar from "../components/Navbar";

const Start = () => {

    const [pin, setPin] = useState("");

    const handleForm = () => {
        
    }

    const handleInput = (e:any) => {
        setPin(e.target.value)
    }


    return (
    <div className="w-screen h-screen overflow-x-hidden bg-[url('bg-image.svg')] bg-center bg-no-repeat bg-cover">
    
        <div className="w-full h-full backdrop-blur-sm bg-black/80 flex flex-col items-center">

            <Navbar/>

            <div className="w-full h-full flex flex-col items-center justify-center">

                <div className="max-w-[475px] w-full h-[400px] flex flex-col items-center justify-center px-4 relative">
                    <div className="w-full h-[198px] bg-[#5A6988] rounded-t-md">
                    </div>
                    <div className="w-full h-[202px] bg-[#3A4466] top-[198px] rounded-b-md">
                    </div>

                    <div className="absolute top-[20px] flex flex-col items-center justify-center">
                        <img src="/tree.png"/>
                        <form onSubmit={handleForm} method="POST" action={"/validate"} className="flex flex-col gap-y-[10px] items-center mt-[12px]">
                            <label className="font-bold text-[32px]">Enter Game Pin</label>
                            <input type="text" className="outline-none px-2 w-[244px] h-[42px] bg-transparent border-4 border-[#FAF8ED] border-solid rounded-md font-semibold" value={pin} onChange={handleInput}/>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    </div>
    );
};

export default Start;
