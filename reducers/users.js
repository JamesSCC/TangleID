import { combineReducers } from 'redux';

import {
  OFF_TANGLE_USERS_REQUEST,
  OFF_TANGLE_USERS_SUCCESS,
  OFF_TANGLE_USERS_FAILURE,
  CHECK_TANGLE_USERS_REQUEST,
  CHECK_TANGLE_USERS_SUCCESS,
  CHECK_TANGLE_USERS_FAILURE,
  FETCH_CLAIMS_REQUEST,
  FETCH_CLAIMS_FAILURE,
  FETCH_CLAIMS_SUCCESS,
  CREATE_CLAIM_REQUEST,
  CREATE_CLAIM_FAILURE,
  CREATE_CLAIM_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  UPDATE_LOCAL_ACCOUNT_REQUEST,
  UPDATE_LOCAL_ACCOUNT_FAILURE,
  UPDATE_LOCAL_ACCOUNT_SUCCESS,
  FETCH_LOCAL_ACCOUNT_REQUEST,
  FETCH_LOCAL_ACCOUNT_FAILURE,
  FETCH_LOCAL_ACCOUNT_SUCCESS,
  FETCH_MAM_MESSAGES_REQUEST,
  FETCH_MAM_MESSAGES_FAILURE,
  FETCH_MAM_MESSAGES_SUCCESS,
  CLOSE_LOGIN_DIALOG,
} from '../constants';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CREATE_CLAIM_REQUEST:
    case FETCH_CLAIMS_REQUEST:
    case OFF_TANGLE_USERS_REQUEST:
    case CHECK_TANGLE_USERS_REQUEST:
    case LOGIN_REQUEST:
    case UPDATE_LOCAL_ACCOUNT_REQUEST:
    case FETCH_LOCAL_ACCOUNT_REQUEST:
    case FETCH_MAM_MESSAGES_REQUEST:
      return true;
    case OFF_TANGLE_USERS_SUCCESS:
    case OFF_TANGLE_USERS_FAILURE:
    case CHECK_TANGLE_USERS_SUCCESS:
    case CHECK_TANGLE_USERS_FAILURE:
    case FETCH_CLAIMS_SUCCESS:
    case FETCH_CLAIMS_FAILURE:
    case CREATE_CLAIM_SUCCESS:
    case CREATE_CLAIM_FAILURE:
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
    case UPDATE_LOCAL_ACCOUNT_FAILURE:
    case UPDATE_LOCAL_ACCOUNT_SUCCESS:
    case FETCH_LOCAL_ACCOUNT_FAILURE:
    case FETCH_LOCAL_ACCOUNT_SUCCESS:
    case FETCH_MAM_MESSAGES_SUCCESS:
    case FETCH_MAM_MESSAGES_FAILURE:
      return false;
    default:
      return state;
  }
};

const validData = (state = [], action) => {
  switch (action.type) {
    case CHECK_TANGLE_USERS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const offTangleData = (state = [], action) => {
  switch (action.type) {
    case OFF_TANGLE_USERS_SUCCESS:
      return Object.keys(action.response)
        .map(id => action.response[id])
        .filter(c => c.id)
        .map((user) => {
          user.claim = JSON.parse(user.claim);
          return user;
        });
    default:
      return state;
  }
};

const localList = (state = [], action) => {
  switch (action.type) {
    case FETCH_LOCAL_ACCOUNT_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case OFF_TANGLE_USERS_FAILURE:
    case CHECK_TANGLE_USERS_FAILURE:
    case FETCH_CLAIMS_FAILURE:
    case CREATE_CLAIM_FAILURE:
    case LOGIN_FAILURE:
    case UPDATE_LOCAL_ACCOUNT_FAILURE:
    case FETCH_LOCAL_ACCOUNT_FAILURE:
    case FETCH_MAM_MESSAGES_FAILURE:
      return action.error;
    default:
      return state;
  }
};

const claims = (state = [], action) => {
  switch (action.type) {
    case CREATE_CLAIM_SUCCESS:
    case FETCH_CLAIMS_SUCCESS:
      return [].concat(state, action.response);
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case FETCH_MAM_MESSAGES_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const isRegister = (state = false, action) => {
  switch (action.type) {
    case CLOSE_LOGIN_DIALOG:
      return false;
    default:
      return state;
  }
};

const isLogin = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
};

const reducer = combineReducers({
  localList,
  offTangleData,
  validData,
  isLoading,
  claims,
  error,
  isRegister,
  isLogin,
  messages,
});

export default reducer;
