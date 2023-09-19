import { useEffect, useState } from "react"
import url from "../main";

const Start = () => {

    const [data, setData] = useState<string>()

    useEffect(() => {
        let subscribed = true;

        const getData = async() => {
            if (subscribed) {
                console.log("fetching data in Start.tsx ...")
                const response = await fetch(url+"/test");
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
        <div className="w-screen h-screen flex items-center justify-center">
            {data}
        </div>
    )
}

export default Start