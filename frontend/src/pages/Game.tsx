import Navbar from "../components/Navbar";

const Game = () => {
    return (
        <div className="w-screen h-screen flex flex-col bg-[url('./stolen-image.png')] bg-center bg-no-repeat bg-cover">
            <div className="w-full h-full flex flex-col backdrop-blur-sm">
                <Navbar />
            </div>
        </div>
    );
};

export default Game;
