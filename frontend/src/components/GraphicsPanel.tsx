import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Question } from "../types";

interface GraphicsPanel {
    state: string;
    pokemon: string;
    questionId: string;
    pokemonHP: number[];
}

const GraphicsPanel = ({state, pokemon, questionId, pokemonHP}: GraphicsPanel) => {

    const [question, setQuestion] = useState<Question>()
    console.log(pokemonHP)
    // get question info
    useEffect(() => {

        const getQuestionData = async() => {

            try {
                const questionRef = doc(db, "questions", questionId);
                const docSnap = await getDoc(questionRef);
                if (docSnap.exists()) {
                    setQuestion(docSnap.data() as Question)
                } else {
                    console.error("No such document!");
                }
            } catch(e) {
                console.error("Error getting document:", e)
            }

        }

        getQuestionData()

    }, [questionId])

    return (
        <div className="w-full h-1/2 flex flex-col justify-between relative">

            <Navbar/>

            <img className="w-[100px]" src={pokemon} alt="pokemon1"/>

            <div className="w-full h-8 bg-[url('/tile002.png')] bg-repeat-x">
            </div>

            {(state === "correct") ?
            <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                Yay! You got it right! The correct answer is indeed: {question?.answer}<br/>
                click 'W' to continue!
                </div>
            </div>
            :""}

            {(state === "incorrect") ?
           <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                    Uh oh, you got it wrong. The correct answer was: {question?.answer}<br/>
                    click 'W' to continue ~~
                </div>
            </div>
            :""}

            {(state === "question") ? 
            <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                {question?.question}
                </div>
            </div>
            :
            ""
            }

        </div>
    )
}

export default GraphicsPanel