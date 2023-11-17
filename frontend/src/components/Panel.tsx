const Panel = () => {

    return (
        <div className="flex flex-row space w-full justify-evenly py-2 px-2">
            <div className="font-bold text-center w-1/5 uppercase bg-[#E06464] rounded-sm border-4 border-white">Fight</div>
            <div className="font-bold text-center w-1/3 uppercase bg-[#43902a] rounded-sm border-4 border-white">Pokemon</div>
            <div className="font-bold text-center w-1/6 uppercase bg-[#2682cc] rounded-sm border-4 border-white">Bag</div>
            <div className="font-bold text-center w-1/6 bg-[#ff7b54] uppercase rounded-sm border-4 border-white">Run</div>
        </div>
    )
}

export default Panel