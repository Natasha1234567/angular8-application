import {EUserActions, UserActions} from './users.actions';
import {intialUserState, UserState} from './user.state';
import { Users } from './users.model';

export function userReducers (
    state : Users,
    action: UserActions
  ): UserState {
    switch (action.type) {
      case EUserActions.GetUsersSuccess: {
        return {
          ...state,
          users: action.payload
        };
      }
      case EUserActions.GetSelectedUserSuccess: {
        return {
          ...state,
          searchedUserData: action.payload
        };
      }
      default:
        return state;
    }
  };
