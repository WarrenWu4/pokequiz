import { useEffect, useState } from "react"
import url from "../main";
import Navbar from "../components/Navbar";

const Waiting = () => {

    const [data, setData] = useState<string>()

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


    return (
        <div className="w-screen h-screen flex flex-col bg-[url('/bg-image.png')] bg-cover bg-no-repeat">
            <Navbar/>
            <div className="w-full h-full flex items-center justify-center flex-col p-4 backdrop-blur-md">
                
                <form onSubmit={handleForm} method="POST" action={url+"/validate"} className="bg-[url('/woodenSign.png')] h-[280px] w-[275px] rounded-lg absolute top-0 flex items-center justify-center flex-col p-4 md:blur-none">
                    <label className="mb-2">Game Pin:</label>
                    <label className="mb-2">Username</label>
                </form>
                <div className=" bg-[url('/depth(-1).png')] bg-contain bg-no-repeat w-full h-[50px] absolute bottom-0">
                </div>
                <div className=" bg-[url('/ground.png')] bg-contain bg-no-repeat w-full h-[80px] absolute bottom-0">
                <div>
                    <a href="https://pokemondb.net/pokedex/charizard"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" alt="Charizard" className="absolute bottom-[75px] left-[50px]"/></a>
                    <a href="https://pokemondb.net/pokedex/venusaur"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur-f.gif" alt="Venusaur" className="absolute bottom-[75px] left-[150px]"/></a>
                    <a href="https://pokemondb.net/pokedex/blastoise"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif" alt="Blastoise" className="absolute bottom-[75px] left-[250px]"/></a>                 
                </div>
                
                </div>
            </div>

        </div>
    )
}

export default Waiting