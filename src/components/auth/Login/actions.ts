import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import jwt from 'jsonwebtoken';
import { AuthAction, AuthActionTypes, ILoginModel, ILoginResponse, ILoginServerError, IUser } from './types';
import setAuthToken from '../../../helpers/setAuthToken';


export interface ILoginResponse {
    access_token: string
    //user: { email: string}
}


export const LoginUser = (data: ILoginModel) => async (dispatch: Dispatch<AuthAction>) => {
        try {
          const response = await http.post<ILoginResponse>("api/auth/login", data);
          const {access_token} = response.data;
          //const user: IUser = { email: response.data.user.email};
          console.log("response ", response.data)
          setAuthUserByToken(access_token, dispatch);
          
          return Promise.resolve();

        } catch (err: any) {
            if (axios.isAxiosError(err)) {
              const serverError = err as AxiosError<ILoginErrors>;
              if (serverError && serverError.response) {
                const { errors } = serverError.response.data;
                return Promise.reject(errors);
              }
            }
            
             return Promise.reject();
          
        }
}


export const setAuthUserByToken = (token: string , dispatch: Dispatch<any>) => {

    const dataUser = jwt.decode(token, { json: true });
    setAuthToken(token);
    localStorage.access_token = token;

    console.log("local storage ", localStorage);
    console.log("data", dataUser!.email)

    const user: IUser = { email: "panda"};
    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: user,
    });
  
  
  }

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
          setAuthToken('');
            dispatch({ type: AuthActionTypes.LOGOUT });
            localStorage.removeItem('access_token')
        } catch (error) {
            
        }
    }
}