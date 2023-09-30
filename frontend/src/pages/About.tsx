import { useEffect, useState } from "react"
import url from "../main";

const About = () => {

    const [loaded, setloaded] = useState<boolean>(false)
    const [data, setdata] = useState<string>("")

    useEffect(() => {

        let subscribed = true; 

        const getData = async() => {
            if(subscribed) {
                console.log("fetching data in About.tsx ...")
                const response = await fetch(url+"/cheng");
                const json = await response.json();
                setdata(JSON.stringify(json))
                setloaded(true)
            }
        }

        getData();

        return () => {
            subscribed = false;
        }
    }, [])

    return (
        <div className=" text-white">
            {loaded ? <div>{data}</div> : <div>Loading...</div>}
        </div>
    )
}

export default About