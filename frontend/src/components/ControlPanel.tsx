const ControlPanel = () => {
    return (
        <div className="w-full h-1/2 bg-[url('/pokeball.png')] bg-no-repeat bg-center bg-contain bg-black">

            <div className="w-full h-full backdrop-blur-sm bg-black/80">

                <div className="w-full h-1/2 flex justify-center items-center">
                    <img src="/cards/fight.svg" />
                </div>

                <div className="w-full h-1/2 flex justify-center gap-x-8">
                    <img src="/cards/mon.svg" />
                    <img className="" src="/cards/bag.svg" />
                    <img src="/cards/run.svg" />
                </div>


            </div>

        </div>
    )
}

export default ControlPanel