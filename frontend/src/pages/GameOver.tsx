import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const GameOver = () => {

    const { score } = useParams<{ score: string }>();
    const { quizId } = useParams<{ quizId: string }>();


    return (
        <div className="w-screen h-screen overflow-x-hidden bg-[url('/bg-image.svg')] bg-center bg-no-repeat bg-cover">
    
        <div className="w-full h-full backdrop-blur-sm bg-black/80 flex flex-col items-center">

            <Navbar/>
        
            <div className="w-full h-full flex flex-col justify-center items-center font-bold text-2xl text-center">

                Game Over!<br/>

                <div className="flex items-center gap-x-2">
                    Your Score Is:<span className="text-[#F9B572]">{score}</span>
                </div>

                <Link to={`/game/${quizId}`} className="mt-4 px-4 py-3 rounded-md text-black bg-white font-semibold text-xl">play again</Link>

            </div>

        </div>
        </div>
    )
}

export default GameOver