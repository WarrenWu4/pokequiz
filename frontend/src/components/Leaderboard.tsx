import Playerboard from "./Playerboard";
import { UserBattleData } from "../types";
const Leaderboard = (props : any) => {
    return (
        <div className="w-[90%] h-[90%] flex flex-col bg-[#130E01] items-center py-8">
            <div className="w-[80%]">
                <div className="flex flex-row items-center py-2">
                    <h1 className="uppercase font-bold flex-1 text-2xl">leaderboard</h1>
                    <img className="w-7" onClick={props.closeLeaderboard} src="/back-btn.png" alt="Nothing" />
                </div>
                {
                    props.players.map((player : UserBattleData) => {
                        return (
                            <Playerboard name={player.uid} correct={player.currQuestionNum} total={props.total} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Leaderboard;