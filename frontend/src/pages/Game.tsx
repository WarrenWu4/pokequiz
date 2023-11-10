import Panel from "../components/Panel"

const Game = () => {
    return (
        <div className="w-screen h-screen">
            <div className="flex-end w-full h-[55%] bg-[#5A6988]">
                <div>
                    <span ></span>
                </div>
            </div>
            <div className="w-full h-[45%] bg-[#3A4466]">
                <Panel/>
                <div className="h-5/6 bg-[#6b7b5a] border-4 rounded-md border-white mx-2 my-1 py-2">
                    <div className="border-white border-4 h-full"></div>
                </div>
            </div>
        </div>
    )
}

export default Game