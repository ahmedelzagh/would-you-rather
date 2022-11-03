import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
    return dispatch => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(null))
            })
    }
}