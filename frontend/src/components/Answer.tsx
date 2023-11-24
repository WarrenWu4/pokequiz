export default function Answer(props: any) {

    return (
        <div className="fixed top-[35%] left-[40%] z-10 items-center justify-center  bg-[#18233AF7] rounded-lg shadow-xl">
            <form  onSubmit={props.onSubmit} className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex items-center justify-between w-full h-full p-2 border-b-[1px] border-b-slate-500">
                    <input
                        type="text"
                        name="question-title"
                        placeholder="Ask a question..."
                        defaultValue={props.title}
                        className="bg-[#18233AF7] border-white text-lg focus:outline-none"
                    ></input>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        viewBox="0 0 384 512"
                        className="fill-white hover:cursor-pointer"
                        onClick={props.onOpen}
                    >
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
                    {
                        props.answers.map((answer: any, index: number) => {
                            return (
                                <div key={index} className="flex justify-center items-center gap-6">
                                    <input
                                        required
                                        name="answer"
                                        placeholder="Type your answer here"
                                        defaultValue={answer.answer}
                                        className="bg-[#7A91C1] text-sm rounded-lg focus:outline-none placeholder:text-slate-300 w-[240px] px-4 py-2 resize-none"
                                    ></input>
                                    <label className="flex items-center justify-center p-1 bg-[#18233AF7]">
                                        <input name="correct" defaultChecked={answer.correct} type="checkbox"></input>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center justify-center w-full h-full p-4">
                    <button
                        type="submit" className="bg-[#5A6988] border-white text-md text-center focus:outline-none px-6 py-1 rounded-lg"
                    >
                        Done
                    </button>
                </div>
            </form>
        </div>
    );
}
