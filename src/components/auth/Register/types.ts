export interface IRegisterModel{
    email: string,
    name: string,
    photo?: FileList[];
    password: string,
    confirmPassword: string
}

export interface RegisterState {
    data: string,
    isRegisterd:boolean,
}


export enum RegisterActionTypes {
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
  }
  
  export interface RegisterSuccessAction {
    type: RegisterActionTypes.REGISTER_SUCCESS;
    payload: string;
  }
  
  export type RegisterAction =
    | RegisterSuccessAction
  ;

  export type RegisterError = {
    email: Array<string>, 
    password: Array<string>, 
    confirmPassword: Array<string>, 
  };
  
  export type RegisterErrors = {
    errors: RegisterError,
    status: number, 
  };