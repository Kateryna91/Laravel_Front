import { combineReducers } from "redux"
import { authReducer } from "../../components/auth/Login/reducer"
import { registerReducer } from "../../components/auth/Register/reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer
});

export type RootState = ReturnType<typeof rootReducer>;