import { useEffect, useState } from "react";
import { Question, UserBattleData } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ControlPanelProps {
    state: string;
    setControlState: Function;
    setGraphicsState: Function;
    questionId: string;
    userBattleData: UserBattleData;
    setUserBattleData: Function;
}

const ControlPanel = ({state, setControlState, setGraphicsState, questionId, userBattleData, setUserBattleData}: ControlPanelProps) => {

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
                    <img src="/cards/mon.svg" />
                    <button onClick={() => setControlState("bag")} className="relative" type="button">
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">bag</h1>
                        <img src="/cards/bag.svg"/>
                    </button>
                    <img src="/cards/run.svg" />
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
                            {userBattleData.items.map((item) => {
                                return (
                                    <button className="text-left uppercase w-full flex justify-between" type="button" onClick={() => useItem}>
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

    }, [state])

    const handleFight = (move: string) => {

        // double check question exists
        if (!question) 
            return

        // in correct set graphics state to "correct",  adjust pokemon hp, update database,
        if (move === question.answer) {
            setGraphicsState("correct")

        }
        // else incorrect set graphics state to "incorrect", adjust pokemon hp, update database
        else {
            setGraphicsState("incorrect")
        }

    }

    const useItem = (item:string) => {
        alert("used " + item)
        // see which item it is
        // if it's a potion, heal pokemon hp & remove from items
        if (item.toLowerCase() === 'potion') {
            setUserBattleData({...userBattleData, items: userBattleData.items.filter((i) => i !== item), pokemonHP: [userBattleData.pokemonHP[0]+20, userBattleData.pokemonHP[1]]})
        }

        // update database
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