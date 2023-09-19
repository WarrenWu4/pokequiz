import { useEffect, useState } from "react"

const App = () => {

    const [test, setTest] = useState<string>("")

    useEffect(() => {
        let subscribed = true;

        const getData = async() => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/test")
            const json = await response.json()
            setTest(json.data)
        }

        getData()

        return () => {
            subscribed = false
        }
    }, [])

    return (
        <div>
            {test}
        </div>
  )
}

export default App