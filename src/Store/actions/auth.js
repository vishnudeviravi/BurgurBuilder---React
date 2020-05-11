import axios from 'axios';
import { AUTH_FAILED, AUTH_START, 
    AUTH_SUCCESS, AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH } from "../Constants";

export const authStart = () => {
    return {
        type:AUTH_START
    }
}

export const authSuccess = ({idToken,localId}) => {
    return {
        type:AUTH_SUCCESS,
        idToken:idToken,
        userId: localId
    }
}

export const authFailed = (error) => {
    return {
        type:AUTH_FAILED,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
       type:AUTH_LOGOUT 
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout() )
        },expirationTime * 1000)

    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {
            email:email,
            password:password, 
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUrL9-7wG_yAre7rtAstJwLGmz1Jlh6oo';
        if (!isSignUp){
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUrL9-7wG_yAre7rtAstJwLGmz1Jlh6oo';
        }
        axios.post(url, authData)
        .then(response => {
                           const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
                           localStorage.setItem('token',response.data.idToken);
                           localStorage.setItem('expirationDate',expirationDate);
                           localStorage.setItem('userId',response.data.localId);
                           dispatch(authSuccess(response.data))
                           dispatch(checkAuthTimeout(response.data.expiresIn))
            })
        .catch(error=> dispatch(authFailed(error.response.data.error)))
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type:SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(logout());
            }
          else {
                let expirationDate = new Date( localStorage.getItem('expirationDate'));
                if (expirationDate <=  new Date()) {
                    dispatch(logout())
                }else{
                    const userId = localStorage.getItem('userId')
                    dispatch(authSuccess(token,userId))
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
                }
            }
    }
}