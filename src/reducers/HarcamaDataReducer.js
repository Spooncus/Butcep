import {HARCAMA_LIST_DATA_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HARCAMA_LIST_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
