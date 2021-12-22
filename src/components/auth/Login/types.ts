export enum AuthActionTypes {//енамка для екшенів
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}


export interface ILoginModel {//модель для форми
    email: string,
    password: string,
    invalid: string
}

export interface ILoginResponse { //інтерфейс даних які ми очікуємо з сервера
    access_token: string,
    user: IUser
}

export interface ILoginServerError {
    email: Array<string>
    password: Array<string>,
    error: string
} 

export interface IUser { //інтерфейс якай описує юзера
    email: string,
    image: string
}

export interface AuthState { // дані які передаєм у діспатч
    user: null|IUser,
    isAuth: boolean,
}

export interface LoginAuthAction {//опис екшену LOGIN
    type: AuthActionTypes.LOGIN,
    payload: IUser
}
export interface LogoutAuthAction {//опис екшену LOGOUT
    type: AuthActionTypes.LOGOUT
}

export type AuthAction = LoginAuthAction | LogoutAuthAction;

export interface ILoginErrors {//інтерфейс для наших помилок
    password: Array<string>;
    email: Array<string> ;
    invalid: string;
  }
  
  export interface ILoginErrors {
    errors: ILoginErrors,
    status: number
  }