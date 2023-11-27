import { useEffect, useState } from "react";
import { Question, UserBattleData } from "../types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

interface ControlPanelProps {
    state: string;
    setControlState: Function;
    setGraphicsState: Function;
    questionId: string;
    userBattleData: UserBattleData;
    setUserBattleData: Function;
    quizLength: number;
    quizId: string;
    uid: string;
}

const ControlPanel = ({state, setControlState, setGraphicsState, questionId, userBattleData, setUserBattleData, quizLength, quizId, uid}: ControlPanelProps) => {

    const [question, setQuestion] = useState<Question>()
    const [layout, setLayout] = useState<JSX.Element>()

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
        if (state === "menu") {
            setLayout(
                <>
                <div className="w-full h-1/2 flex justify-center items-center">
                    <button onClick={() => setControlState("fight")} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">fight</h1>
                        <img src="/cards/fight.svg"/>
                    </button>
                </div>

                <div className="w-full h-1/2 flex justify-center gap-x-8">
                    <button type="button" className="relative">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">board</h1>
                        <img src="/cards/mon.svg" />
                    </button>
                    <button onClick={() => setControlState("bag")} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">bag</h1>
                        <img src="/cards/bag.svg"/>
                    </button>
                    <button type="button" onClick={() => setControlState("run")} className="relative">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">run</h1>
                        <img src="/cards/run.svg" />
                    </button>
                </div>
                </>
            )
        }
        else if (state === "fight" && question) {
            setLayout(
                <div className=" w-full h-full px-4 flex flex-col gap-y-8 justify-center items-center">
                    <div className="flex gap-x-4 text-black">
                    <button onClick={() => handleFight(question.options[0])} className="relative" type="button">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{question.options[0]}</h1>
                            <img src="/cards/moves.svg"/>
                        </button>                    
                        <button onClick={() => handleFight(question.options[1])} className="relative" type="button">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{question.options[1]}</h1>
                            <img src="/cards/moves.svg"/>
                        </button>
                    </div>
                    <div className="flex gap-x-4 text-black">
                        <button onClick={() => handleFight(question.options[2])} className="relative" type="button">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{question.options[2]}</h1>
                            <img src="/cards/moves.svg"/>
                        </button>                    
                        <button onClick={() => handleFight(question.options[3])} className="relative" type="button">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{question.options[3]}</h1>
                            <img src="/cards/moves.svg"/>
                        </button>
                    </div>
                    <button onClick={() => setControlState("menu")} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">cancel</h1>
                        <img src="/cards/cancel.svg"/>
                    </button>
                </div>
            )
        }
        else if (state === "bag") {
            setLayout(
                <div className="w-full h-full p-4 flex justify-center items-center">
                    <div className="w-full h-full px-1 py-3 rounded-lg border-4 border-solid border-[#242521] bg-[#F8C058] flex justify-center items-center">
                        <div className="text-black text-xl font-extralight w-full h-full bg-[#F8E0A8] flex flex-col">
                            {userBattleData.items.map((item, index) => {
                                return (
                                    <button key={index} className="text-left uppercase w-full flex justify-between" type="button" onClick={() => useItem}>
                                        <h1>{item}</h1>
                                        <h1 className="lowercase">x 1</h1>
                                    </button>
                                )
                            })}
                            <button className="text-left" type="button" onClick={() => setControlState("menu")}>CLOSE BAG</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (state === "run") {
            setLayout(
            <div className="w-full h-full p-4 bg-black flex flex-col justify-center items-center gap-y-4">
                
                <h1 className="font-bold text-xl">Are you sure you want to run?</h1>

                <div className="flex justify-center items-center gap-x-4">
                    <Link to={"/"} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Yes</h1>
                        <img src="/cards/mon.svg"/>
                    </Link>
                    <button onClick={() => setControlState("menu")} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No</h1>
                        <img src="/cards/mon.svg"/>
                    </button>
                </div>

            </div>)
        }

    }, [state])

    const handleFight = async (move: string) => {

        // double check question exists
        if (!question) 
            return

        // in correct set graphics state to "correct",  adjust pokemon hp, update database, move to next question
        if (move === question.answer) {
            setGraphicsState("correct")
            setUserBattleData({...userBattleData, pokemonHP: [userBattleData.pokemonHP[0], userBattleData.pokemonHP[1]*(userBattleData.currQuestionNum/quizLength)], score: userBattleData.score+1})
            const temp = {...userBattleData, pokemonHP: [userBattleData.pokemonHP[0], userBattleData.pokemonHP[1]*(userBattleData.currQuestionNum/quizLength)], currQuestionNum: userBattleData.currQuestionNum+1, score: userBattleData.score+1}
            await setDoc(doc(db, `quizzes/${quizId}/players`, uid), temp)
        }
        // else incorrect set graphics state to "incorrect", adjust pokemon hp, update database, move to next question
        else {
            setGraphicsState("incorrect")
            setUserBattleData({...userBattleData, pokemonHP: [userBattleData.pokemonHP[0]*(1 - userBattleData.currQuestionNum/quizLength), userBattleData.pokemonHP[1]]})
            const temp = {...userBattleData, pokemonHP: [userBattleData.pokemonHP[0]*(1 -userBattleData.currQuestionNum/quizLength), userBattleData.pokemonHP[1]], currQuestionNum: userBattleData.currQuestionNum+1}
            await setDoc(doc(db, `quizzes/${quizId}/players`, uid), temp)
        }

    }

    const useItem = async (item:string) => {
        // see which item it is
        // if it's a potion, heal pokemon hp & remove from items
        if (item.toLowerCase() === 'potion') {
            setUserBattleData({...userBattleData, items: userBattleData.items.filter((i) => i !== item), pokemonHP: [userBattleData.pokemonHP[0]+20, userBattleData.pokemonHP[1]]})
            const temp = {...userBattleData, items: userBattleData.items.filter((i) => i !== item), pokemonHP: [userBattleData.pokemonHP[0]+20, userBattleData.pokemonHP[1]]}
            // update database
            await setDoc(doc(db, `quizzes/${quizId}/players`, uid), temp)
        }

    }
    
    return ((question && layout) ?
        <div className="w-full h-1/2 bg-[url('/pokeball.png')] bg-no-repeat bg-center bg-contain bg-black">

            <div className="w-full h-full backdrop-blur-sm bg-black/80">

                {layout}

            </div>

        </div>
        :
        <></>
    )
}

export default ControlPanel