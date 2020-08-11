import {
  HARCAMA_CHANGED,
  HARCAMA_OLUSTUR_REQUEST,
  HARCAMA_OLUSTUR_REQUEST_SUCCESS,
  HARCAMA_OLUSTUR_REQUEST_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  firma: '',
  aciklama: '',
  fiyat: '',
  tarih: '',
  kategori: '',
  loadingCancel: false,
  loadingSave: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HARCAMA_CHANGED:
      return {...state, [action.payload.props]: action.payload.value};
    case HARCAMA_OLUSTUR_REQUEST:
      return {...state, loadingSave: true};
    case HARCAMA_OLUSTUR_REQUEST_SUCCESS:
      return INITIAL_STATE;
    case HARCAMA_OLUSTUR_REQUEST_FAIL:
      return {...state, loadingSave: false};
    default:
      return state;
  }
};
