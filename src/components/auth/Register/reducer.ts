import { RegisterAction, RegisterState, RegisterActionTypes } from "./types";


const initialState: RegisterState = {
  data: '',
  isRegisterd: false,
};

export const registerReducer = ( state = initialState, action: RegisterAction): RegisterState => {
  switch (action.type) {
   
    case RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterd: true,
        data: action.payload, 
      };

    default:
      return state;
  }
};