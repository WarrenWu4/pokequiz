import Answer from "../components/Answer";
import Question from "../components/Question";
import { useState } from "react";

export default function QuestionSelector() {
    const [questions, setQuestions] = useState([
        <Question />,
        <Question />,
        <Question />,
    ]);

    const [modalOpen, setModalOpen] = useState(false);

    const handleAddQuestion = () => {
        setQuestions([...questions, <Question key={questions.length + 1} />]);
    };
    const handleDeleteQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className="w-full min-h-[100vh] p-4 text-white bg-[#3A4466]">
            <h1 className="text-4xl font-bold text-center pt-2">POKEDEX</h1>
            <div className="flex items-center justify-center w-full border-b-[1px] p-4 gap-6">
                <img src="/image.png" className="w-1/3 h-1/3"></img>
                {/* form needs fixing for submissions */}
                <form className="flex flex-col items-center justify-center space-y-4 p-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Set Title"
                        className="bg-[#3A4466] border-b-[1px] border-white text-sm focus:outline-none"
                    ></input>
                    <input
                        type="text"
                        name="description"
                        placeholder="Set Description"
                        className="bg-[#3A4466] border-b-[1px] border-white text-sm focus:outline-none"
                    ></input>
                </form>
            </div>
            <div className="flex flex-col items-center justify-start w-full h-full p-4 pb-0 gap-6">
                {questions.map((index) => (
                    <Question
                        key={index}
                        onOpen={handleModalOpen}
                        onDelete={handleDeleteQuestion}
                        index={index}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center w-full h-full p-4 gap-6">
                <img src="/addQuestion.svg" onClick={handleAddQuestion} />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2">
                <button className="bg-[#5A6988] border-white text-md text-center focus:outline-none px-6 py-1 rounded-lg">
                    Save
                </button>
            </div>
            {/* positioning might be done wrong */}
            <div
                className={`${
                    modalOpen ? "flex" : "hidden"
                } fixed top-[10vh] left-[8vw] z-10 items-center justify-center  bg-[#18233AF7] rounded-lg shadow-xl`}
            >
                <form className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex items-center justify-between w-full h-full p-2 border-b-[1px] border-b-slate-500">
                        <input
                            type="text"
                            name="question-title"
                            placeholder="Ask a question..."
                            className="bg-[#18233AF7] border-white text-lg focus:outline-none"
                        ></input>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 384 512"
                            onClick={handleModalOpen}
                            className="fill-white"
                        >
                            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
                        <textarea
                            name="question-description"
                            placeholder="Enter a description..."
                            className="bg-[#18233AF7] border-[1px] rounded-lg border-white text-md focus:outline-non w-full px-4 py-2 focus:outline-none resize-none"
                        ></textarea>
                        <Answer />
                        <Answer />
                        <Answer />
                        <Answer />
                    </div>
                    <div className="flex items-center justify-center w-full h-full p-4">
                        <button
                            onClick={handleModalOpen}
                            className="bg-[#5A6988] border-white text-md text-center focus:outline-none px-6 py-1 rounded-lg"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
