import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case LOGIN_USER:
      return {...state, loading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loading: false};
    case LOGIN_USER_FAIL:
      return {...state, loading: false};
    case REGISTER_USER:
      return {...state, loading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, loading: false};
    case REGISTER_USER_FAIL:
      return {...state, loading: false};
    default:
      return state;
  }
};
