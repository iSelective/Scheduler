import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER,
} from './ActionTypes'

export const emailChanged = emailText => ({
  type: EMAIL_CHANGED,
  payload: emailText,
})

export const passwordChanged = passwordText => ({
  type: PASSWORD_CHANGED,
  payload: passwordText,
})

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}
const loginUserSucccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  })
  Actions.main()
}

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSucccess(dispatch, user))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSucccess(dispatch, user))
        .catch(() => loginUserFail(dispatch))
    })
}