import { useEffect, useState } from "react"
import Navbar from "../components/Navbar";

const Waiting = () => {

    const [data, setData] = useState<string>()

    useEffect(() => {
        let subscribed = true;
        console.log(data)
        const getData = async() => {
            if (subscribed) {
                const response = await fetch("/");
                const json = await response.json();
                setData(json.data);
            }
        }
        
        getData();
        return () => {
            subscribed = false;
        }
    }, [])


    return (
        <div className="w-screen h-screen overflow-x-hidden bg-[url('bg-image.svg')] bg-center bg-no-repeat bg-cover">
    
            <div className="w-full h-full backdrop-blur-sm bg-black/80 flex flex-col items-center">
            
                <Navbar/>
                    
                    <div className="bg-[url('/wooden-sign.svg')] h-[50%] w-[50%] bg-contain bg-center px-4 bg-no-repeat mt-24 flex justify-center items-center flex-wrap p-8">
                        askldjfalsdjfaksldfjasf
                    </div>
                    <div className=" bg-[url('/tile006.png')] bg-contain w-full h-[40px] absolute bottom-0">
                    </div>
                    <div className="bg-[url('/tile002.png')] bg-contain w-full h-[40px] absolute bottom-[40px]">
                    <div className="absolute w-full flex justify-center bottom-[35px]">
                        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" alt="Charizard"/>
                        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur-f.gif" alt="Venusaur"/>
                        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif" alt="Blastoise"/>         
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Waiting