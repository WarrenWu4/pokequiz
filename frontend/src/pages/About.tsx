import { useEffect, useState } from "react"
import url from "../main";

const About = () => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<string>("")

    useEffect(() => {

        let subscribed = true;

        const getData = async() => {
            if (subscribed) {
                console.log("fetching data in About.tsx ...")
                const response = await fetch(url+"/warrenwu");
                const json = await response.json();
                setData(JSON.stringify(json))
                setLoaded(true)
            }
        }

        getData();

        return () => {  
            subscribed = false;
        }

    }, [])

    return (
        <div className="text-white">
            {loaded ? <div>{data}</div> : <div>Loading...</div>}
        </div>
    )
}

export default About