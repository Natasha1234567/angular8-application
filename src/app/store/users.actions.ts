import { Action } from '@ngrx/store';
import { User,searchedUser } from './users.model';

export enum EUserActions {
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetSelectedUserSuccess = '[User] Get Search Value',
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: User[]) {}
}

export class GetSelectedUserSuccess implements Action {
  public readonly type = EUserActions.GetSelectedUserSuccess;
  constructor(public payload: searchedUser) {}
}

export type UserActions = GetUsers | GetUsersSuccess | GetSelectedUserSuccess;