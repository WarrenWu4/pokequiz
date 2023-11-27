export default interface User {
    uid: string;
    username: string;
    email: string;
    quizIds: string[];
}

export interface Quiz {
    quizId: string;
    title: string;
    description: string;
    questionIds: string[];
}

export interface Question {
    question: string;
    options: string[];
    answer: number;
}