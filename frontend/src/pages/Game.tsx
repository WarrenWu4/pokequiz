import { useEffect, useState } from "react"
import url from "../main";
import Loading from "../components/Loading";
import Actions from "../components/Actions";
import Leaderboard from "../components/Leaderboard";

interface Developer {
    name: string;
    year: string;
    major: string;
    about: string;
}

const Game = () => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<Developer[]>([])

    useEffect(() => {

        let subscribed = true;

        const getData = async() => {
            if (subscribed) {
                console.log("fetching data in Game.tsx ...")
                const response = await fetch(url+"/developers");
                const json = await response.json();
                setData(json)
                setLoaded(true)
            }
        }

        getData();

        return () => {  
            subscribed = false;
        }

    }, [])

    return (
        <div className="w-full h-screen p-0 text-white">
            {loaded ?
                
                <div className="w-full h-full p-0">
                    <div className="w-full h-11/20 bg-[url('../../public/fight-background-placeholder.png')] bg-cover">
                        <Leaderboard/>
                        <h1>test</h1>
                        <h1>test</h1>
                    </div>
                    <Actions/>
                </div>
                :
                <Loading/>
            }
        </div>
    )
}

export default Game