const Loading = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-2 justify-center items-center text-4xl text-white font-bold">
            <img src="/pokeball.png" className="w-[80px] h-[80px] animate-spin"/>
            loading
        </div>
    )
}

export default Loading