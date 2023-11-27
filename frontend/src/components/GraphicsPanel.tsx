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

// todo: animation idea: remove dialog, set a timer of 2s, fireball/waterball animation, then show dialog

const GraphicsPanel = ({state, pokemon, questionId}: GraphicsPanel) => {

    const [question, setQuestion] = useState<Question>()
    const [layout, setLayout] = useState<JSX.Element>(<></>)

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

    useEffect(() => {
    
        if (state === "correct") correctAnimation()
        if (state === "incorrect") incorrectAnimation()
        
    }, [state])
    

    const correctAnimation = () => {

        setLayout(<img className="absolute w-1/6 right-16 bottom-2" src="/fire-baby.gif" alt="firebaby"/>)

        setTimeout(() => {
            setLayout(
            <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                    Yay! You got it right! The correct answer is indeed: {question?.answer}<br/>
                click or tap to continue!
                </div>
            </div>
            )
        }, 2000)

    }

    const incorrectAnimation = () => {

        setLayout(<img className="absolute w-1/6 left-16 bottom-8" src="/rain-baby.gif" alt="rainbaby"/>)

        setTimeout(() => {
            setLayout(
            <div className="absolute p-2 w-full h-full flex items-center justify-center opacity-90">
                <div className="bg-[#130E01] w-full h-full text-white font-bold text-2xl rounded-md flex justify-center items-center p-4">
                    Uh oh, you got it wrong. The correct answer was: {question?.answer}<br/>
                click or tap to continue~~
                </div>
            </div>
            )
        }, 2000)
    }

    return (
        <div className="w-full h-1/2 flex flex-col justify-between relative">

            <Navbar/>

            <img className="absolute w-1/6 left-16 bottom-7 -scale-x-100" src={pokemon} alt="pokemon1"/>
            <img className="absolute w-1/6 right-16 bottom-5" src={"https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif"} alt="pokemon2"/>

            <div className="w-full h-8 bg-[url('/tile002.png')] bg-repeat-x">
            </div>

            {(state === "correct") ? layout:""}

            {(state === "incorrect") ? layout:""}

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