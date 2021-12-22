import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import jwt from 'jsonwebtoken';
import { AuthAction, AuthActionTypes, ILoginModel, ILoginServerError, IUser } from './types';
import setAuthToken from '../../../helpers/setAuthToken';
import { ILoginErrors } from './types';

export interface ILoginResponse {
    access_token: string
    //user: { email: string}
}

export const LoginUser = (data: ILoginModel) => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const response = await http.post<ILoginResponse>("api/auth/login", data); // посилаєм форму на сервер і отримуєм результат
    const {access_token} = response.data; //присвоюєм отриманий токен по інтерфейсу ILoginResponse
    //const {user} = response.data;
    //console.log(user);


    setAuthUserByToken(access_token, dispatch); //передаєм токен і діспатч в окрему функцію 
    
    return Promise.resolve(); // повертаєм проміс
    
  } catch (err: any) {
      if (axios.isAxiosError(err)) { // перевіряєм чи аксіос ловить помилки сервера
          const serverError = err as AxiosError<ILoginErrors>; //присвоюєм їх

          if (serverError && serverError.response) {
              const { errors } = serverError.response.data;
              return Promise.reject(errors); //повертаєм проміс з помилками
          }
      }
      
      return Promise.reject(); // якщо вони не в аксіосі повертаєм пустий хибний проміс
      
  }
}


export const setAuthUserByToken = (token: string, dispatch: Dispatch<any>) => {
localStorage.access_token = token; // кідаєм його в храніліще
setAuthToken(token);
const user = jwt.decode(token) as IUser; // декодуєм його для витягнення даних
dispatch({ // кідаєм в діспатч тип події і юзера
  type: AuthActionTypes.LOGIN, 
  payload: {
      email: user.email,
  }
});  
}

export const LogoutUser = () => {
return async (dispatch: Dispatch<AuthAction>) => {
  try {
    setAuthToken(''); // знищуєм токен
      dispatch({ type: AuthActionTypes.LOGOUT }); //кідаєм в діспатч подію
      localStorage.removeItem('access_token') // видаляєм токен з локал стореджа
  } catch (error) {
      
  }
}
}