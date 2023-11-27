import Navbar from "./Navbar"

interface GraphicsPanel {
    state: string;
    pokemon: string;
    question: string;
}

const GraphicsPanel = ({state, pokemon, question}: GraphicsPanel) => {

    console.log(state, pokemon, question)

    return (
        <div className="w-full h-1/2 flex flex-col justify-between relative">

            <Navbar/>

            <img className="w-[100px]" src={pokemon} alt="pokemon1"/>

            <div className="w-full h-8 bg-[url('/tile002.png')] bg-repeat-x">
            </div>

            {(state === "question") ? 
            <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                {question}
                </div>
            </div>
            :
            ""
            }

        </div>
    )
}

export default GraphicsPanel