export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}


export interface ILoginModel {
    email: string,
    password: string,
    invalid: string
}

export interface ILoginResponse {
    access_token: string,
    user: IUser
}

export interface ILoginServerError {
    email: Array<string>
    password: Array<string>,
    error: string
} 

export interface IUser {
    email: string,
    image: string
}

export interface AuthState {
    user: null|IUser,
    isAuth: boolean,
}

export interface LoginAuthAction {
    type: AuthActionTypes.LOGIN,
    payload: IUser
}
export interface LogoutAuthAction {
    type: AuthActionTypes.LOGOUT
}

export type AuthAction = LoginAuthAction | LogoutAuthAction;

export interface ILoginError {
    password: Array<string>;
    email: Array<string> ;
    invalid: string;
  }
  
  export interface ILoginErrors {
    errors: ILoginError,
    status: number
  }