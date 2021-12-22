import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { setAuthUserByToken } from '../Login/actions';
import { RegisterAction, RegisterActionTypes, RegisterErrors } from './types';


export const RegisterUser = (data: FormData) => {return async (dispatch: Dispatch<RegisterAction>) => {
    try {
        //код прокоментовано в '../Login' 
        const response = await http.post("api/auth/register", data, {headers: { "Content-Type": "multipart/form-data" },}); // зазначили контент тайп для передачі фото через форму
        const {access_token} = response.data;

        dispatch({
          type: RegisterActionTypes.REGISTER_SUCCESS,
          payload: access_token,
        });

        setAuthUserByToken(access_token, dispatch);
        return Promise.resolve(access_token);  
    }
    catch (err: any) {
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