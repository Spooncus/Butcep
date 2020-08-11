import {
  HARCAMA_UPDATE_REQUEST,
  HARCAMA_UPDATE_REQUEST_SUCCESS,
  HARCAMA_UPDATE_REQUEST_FAIL,
  HARCAMA_DELETE_REQUEST,
  HARCAMA_DELETE_REQUEST_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  loadingUpdate: false,
  loadingDelete: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HARCAMA_UPDATE_REQUEST:
      return {loadingUpdate: true};
    case HARCAMA_UPDATE_REQUEST_SUCCESS:
      return INITIAL_STATE;
    case HARCAMA_UPDATE_REQUEST_FAIL:
      return INITIAL_STATE;
    case HARCAMA_DELETE_REQUEST:
      return {loadingDelete: true};
    case HARCAMA_DELETE_REQUEST_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
