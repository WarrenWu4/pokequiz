import { useEffect, useState } from "react"
import { Quiz } from "../types";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import GraphicsPanel from "../components/GraphicsPanel";
import ControlPanel from "../components/ControlPanel"
import Loading from "../components/Loading";


const Game = () => {

    const [quizData, setQuizData] = useState<Quiz>()

    /**
     * ~ start: play starting animation
     * ~ question: show question
     * ~ answer: show correct answer & play animation 
     */
    const [turn, setTurn] = useState<string>("start")
    const [questionNum, setQuestionNum] = useState<number>(0)
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()

    useEffect(() => {

        // get quiz data
        const getQuizData = async() => {

            // double check id exists
            if (!id) {
                nav("/start/error")
            } else {
                // get game id from url
                const quizRef = doc(db, "quizzes", id);
                const docSnap = await getDoc(quizRef);
                // if game id is invalid, redirect to start page with error message
                // otherwise, fetch quiz data from backend
                if (docSnap.exists()) {
                    setQuizData(docSnap.data() as Quiz)
                } else {
                    nav("/start/error")
                }
            }
        }

        getQuizData()

    }, [])

    return ((quizData) ?
        <div className="w-screen h-screen overflow-x-hidden bg-[#5A6988] bg-center bg-no-repeat bg-cover">

            <GraphicsPanel state={turn} pokemon="https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" question={quizData.questionIds[questionNum]}/>

            <ControlPanel/>

        </div>
        :
        <Loading/>
    )
}

export default Game
