import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { setAuthUserByToken } from '../Login/actions';
import { RegisterAction, RegisterActionTypes, RegisterErrors } from './types';


export const RegisterUser = (data: FormData) => {return async (dispatch: Dispatch<RegisterAction>) => {
    try {
        console.log("nachalo 11");
        const response = await http.post("api/auth/register", data, {headers: { "Content-Type": "multipart/form-data" },});
        const token = await response.data.token;
        console.log(response.data);
        dispatch({
          type: RegisterActionTypes.REGISTER_SUCCESS,
          payload: token,
        });

        setAuthUserByToken(token, dispatch);
        return Promise.resolve( token );  
    }
    catch (err: any) {
        console.log("nachalo catch 23");

        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<RegisterErrors>;
          if (serverError && serverError.response) {
            const { errors } = serverError.response.data;
            return Promise.reject(errors);
          }
        }
    }
};
};