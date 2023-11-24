import Answer from "../components/Answer";
import Question from "../components/Question";
import { useState } from "react";
type AnswerProps = {
    answer: string;
    correct: boolean;
};
type QuestionProps = {
    title: string;
    index: number;
    answers: AnswerProps[];
};
const result: QuestionProps[] = [];

export default function QuestionSelector() {
    
    const [questions, setQuestions] = useState(result);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    const handleDeleteQuestion = (index: number) => {
        console.log(index);
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleModalOpen = (index : number) => {
        setModalOpen(!modalOpen);
        setModalIndex(index);
    };

    const handleModalSubmit = (e : React.MouseEvent<HTMLFormElement>, index : number) => {
        e.preventDefault();

        const newQuestion : QuestionProps = {
            title: (document.getElementsByName("question-title")[0] as HTMLInputElement).value,
            index: index,
            answers: [{ answer: (document.getElementsByName("answer")[0] as HTMLInputElement).value, correct: (document.getElementsByName("correct")[0] as HTMLInputElement).checked },
            { answer: (document.getElementsByName("answer")[1] as HTMLInputElement).value, correct: (document.getElementsByName("correct")[1] as HTMLInputElement).checked },
            { answer: (document.getElementsByName("answer")[2] as HTMLInputElement).value, correct: (document.getElementsByName("correct")[2] as HTMLInputElement).checked },
            { answer: (document.getElementsByName("answer")[3] as HTMLInputElement).value, correct: (document.getElementsByName("correct")[3] as HTMLInputElement).checked }]
        };
        const newQuestions = [...questions];
        newQuestions[index] = newQuestion;
        setQuestions(newQuestions);
        setModalOpen(!modalOpen);
    }

    const handleAddQuestion = () => {
        setQuestions([...questions,
        {
            title: "Question Title",
            index: 0,
            answers: [{answer: "", correct: false}, {answer: "", correct: false}, {answer: "", correct: false}, {answer: "", correct: false}]
        }
        ]);
    };

    return (
        <div className="w-full min-h-[100vh] p-4 text-white bg-[#3A4466] flex justify-center">
            <div className="w-[90%] max-w-[800px] h-full">
                <h1 className="text-4xl font-bold text-center pt-2">QUESTION CENTER</h1>
                <div className="flex items-center justify-center w-full border-b-[1px] p-4 gap-6">
                    <img src="/image.png" className="max-w-[100px] max-h-xs w-1/3 h-1/3"></img>
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
                    {questions.map((question, index) => (
                        question.index = index,
                        <Question
                            key={index}
                            title={question.title}
                            index={index}
                            onDelete={handleDeleteQuestion}
                            onOpen={() => {handleModalOpen(index)}}
                        />
                    ))
                    }
                </div>
                <div className="flex items-center hover:cursor-pointer justify-center w-full h-full p-4 gap-6">
                    <img src="/addQuestion.svg" onClick={handleAddQuestion} />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2">
                    <button className="bg-[#5A6988] border-white text-md text-center focus:outline-none px-6 py-1 rounded-lg">
                        Save
                    </button>
                </div>
                {modalOpen && (
                    <Answer 
                            onSubmit={(e : React.MouseEvent<HTMLFormElement>) => {handleModalSubmit(e, modalIndex)}}
                            onOpen={() => {handleModalOpen(modalIndex)}} 
                            title={questions[modalIndex].title}
                            answers={questions[modalIndex].answers}
                    />)
                }
            </div>
        </div>
    );
}
