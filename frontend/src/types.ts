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
    answer: string;
}

export interface UserBattleData {
    uid: string;
    pokemonHP: number[];
    items: string[];
    currQuestionNum: number;
    score: number;
}
