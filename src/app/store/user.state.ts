import {User, searchedUser} from './users.model';

export interface UserState {
    users: User[],
    searchedUserData: searchedUser
}

export const intialUserState : UserState = {
    users: [],
    searchedUserData: {
        id: 0,
        name: "",
        type: ""
    }
}