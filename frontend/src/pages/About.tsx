<<<<<<< HEAD
import { useEffect, useState } from "react";
import url from "../main";

const About = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<string>("")
    useEffect(() => {
=======
import { useEffect, useState } from "react"
import url from "../main";
import Loading from "../components/Loading";

interface Developer {
    name: string;
    year: string;
    major: string;
    about: string;
}

const About = () => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<Developer[]>([])

    useEffect(() => {

>>>>>>> d91a3ce49d9b001f1ed849009f4a7e26e3aaf767
        let subscribed = true;

        const getData = async() => {
            if (subscribed) {
                console.log("fetching data in About.tsx ...")
<<<<<<< HEAD
                const response = await fetch(url+"/benjaminkumar");
                const json = await response.json();
                setData(JSON.stringify(json));
                setLoaded(true)
            }
        }
        
        getData();
        console.log(data)
        return () => {
            subscribed = false;
        }
    }, [])
    return(
        <div className="text-white">
            {loaded ? <div>{data}</div> : <div>Loading...</div>}
=======
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
        <div className="w-full h-full p-4 text-white">
            {loaded ?
                <div className="w-full h-full flex p-12 gap-x-12">
                    {data.map((dev:Developer) => {
                        return (
                            <div key={dev.name}>
                                <h1>{dev.name}</h1>
                                <h2>{dev.year}</h2>
                                <h2>{dev.major}</h2>
                                <p>{dev.about}</p>
                            </div>
                        )
                    })}
                </div>
                :
                <Loading/>
            }
>>>>>>> d91a3ce49d9b001f1ed849009f4a7e26e3aaf767
        </div>
    )
}

export default About