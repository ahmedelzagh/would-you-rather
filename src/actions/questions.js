import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const BIND_ANSWER_TO_QUESTION = 'BIND_ANSWER_TO_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion (question) {
    return {
        type:ADD_QUESTION,
        question
    }
}

export function bindAnswerToQuestion (authedUser, qid, answer) {
    return {
        type: BIND_ANSWER_TO_QUESTION,
        authedUser,
        answer,
        qid
    }
}

export function handleSaveQuestion (optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion({ optionOneText, optionTwoText, author })
        .then(question => {
            dispatch(addQuestion(question))
            dispatch(addQuestionToUser(question))
        })
    }
}
