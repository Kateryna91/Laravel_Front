import * as AuthActions from '../../components/auth/Login/actions';
import * as RegisterUser from '../../components/auth/Register'

const actions = {
    ...AuthActions,
    ...RegisterUser
}

export default actions;