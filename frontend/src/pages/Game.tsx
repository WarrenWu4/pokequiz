import { useEffect, useState } from "react"
import { Quiz, UserBattleData } from "../types";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import GraphicsPanel from "../components/GraphicsPanel";
import ControlPanel from "../components/ControlPanel"
import Loading from "../components/Loading";

// todo: fix mon graphics

const Game = () => {

    const [quizData, setQuizData] = useState<Quiz>()
    const { id } = useParams<{ id: string }>()
    const uid = auth.currentUser?.uid
    const nav = useNavigate()

    const [leaderboardData, setLeaderboardData] = useState<UserBattleData[]>([])
    /**
     * ~ question: show question
     * ~ correct: show correct answer & reduce hp
     * ~ incorrect: show correct answer & reduce hp 
     */
    const [graphicsState, setGraphicsState] = useState<string>("question")

    /**
     * ~ menu: default state to show all btns
     * ~ fight: show answer choices
     * ~ bag: show items
     * ~ pokemon: show leaderboard modal
     * ~ run: confirm quit then redirect to start page
     */
    const [controlState, setControlState] = useState<string>("menu")

    const [userBattleData, setUserBattleData] = useState<UserBattleData>({
        uid: (uid) ? uid : "anonymous"+Math.floor(Math.random()*1000000),
        pokemonHP: [100, 100],
        items: ["potion"],
        currQuestionNum: 0,
        score: 0,
    })

    useEffect(() => {
        const resetPlayerData = async() => {
            if (id && uid) {
            const temp = {
                uid: (uid) ? uid : "anonymous"+Math.floor(Math.random()*1000000),
                pokemonHP: [100, 100],
                items: ["potion"],
                currQuestionNum: 0,
                score: 0,
            }
            await setDoc(doc(db, `quizzes/${id}/players`, uid), temp)
        }}

        const handleKeyDown = (e:any) => {
            if (graphicsState === "question") return;
            const key = e.key;
            if (key === "w") {
                setGraphicsState("question")
                setControlState("menu")
                setUserBattleData({...userBattleData, currQuestionNum: userBattleData.currQuestionNum+1})
            }
        }
        const handleMouseDown = () => {
            if (graphicsState === "question") return;
            setGraphicsState("question")
            setControlState("menu")
            setUserBattleData({...userBattleData, currQuestionNum: userBattleData.currQuestionNum+1})
        }
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("mousedown", handleMouseDown)

        if (userBattleData.currQuestionNum === quizData?.questionIds.length) {
            resetPlayerData()
            nav(`/gameover/${userBattleData.score}/${id}`)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("mousedown", handleMouseDown)
        }

    }, [graphicsState])

    const getLeaderBoardData = async() => {
        if(id) {
            const leaderBoardRef = doc(db, `quizzes/${id}/players`);
            const docSnap = await getDoc(leaderBoardRef);
            if (docSnap.exists()) {
                setLeaderboardData(docSnap.data() as UserBattleData[])
                console.log(docSnap.data())
            }
        }
    }

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

        const getBattleData = async() => {
            if (uid) {
                const userBattleRef = doc(db, `quizzes/${id}/players`, uid);
                const docSnap = await getDoc(userBattleRef);
                if (docSnap.exists()) {
                    setUserBattleData(docSnap.data() as UserBattleData)
                }
            }
        }

        

        getQuizData()
        getBattleData()
    }, [])

    return ((quizData && id) ?
        <div className="w-screen h-screen overflow-x-hidden bg-[#5A6988] bg-center bg-no-repeat bg-cover relative">

            <GraphicsPanel 
                state={graphicsState} 
                pokemon="https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" 
                questionId={quizData.questionIds[userBattleData.currQuestionNum]} 
                pokemonHP={userBattleData.pokemonHP}
            />

            {/* disable control panel if not question */}
            {(graphicsState !== "question") ?
            <div className="w-full h-full bg-black opacity-80">
                <ControlPanel
                    state={controlState}
                    setControlState={setControlState}
                    setGraphicsState={setGraphicsState}
                    questionId={quizData.questionIds[userBattleData.currQuestionNum]}
                    userBattleData={userBattleData}
                    setUserBattleData={setUserBattleData}
                    quizLength={quizData.questionIds.length}
                    quizId={id}
                    uid={uid}
                    getLeaderboardData={getLeaderBoardData}
                    leaderBoardData={leaderboardData}
                />
            </div>
            :
            <ControlPanel
                state={controlState}
                setControlState={setControlState}
                setGraphicsState={setGraphicsState}
                questionId={quizData.questionIds[userBattleData.currQuestionNum]}
                userBattleData={userBattleData}
                setUserBattleData={setUserBattleData}
                quizLength={quizData.questionIds.length}
                quizId={id}
                uid={uid}
                getLeaderboardData={getLeaderBoardData}
                leaderBoardData={leaderboardData}
            />
            }

        </div>
        :
        <Loading/>
    )
}

export default Game
