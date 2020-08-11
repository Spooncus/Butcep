import {combineReducers} from 'redux';
import kimlikdogrulamaReducers from './KimlikDogrulamaReducers';
import HarcamaOlusturReducers from './HarcamaOlusturReducer';
import HarcamaDataReducers from './HarcamaDataReducer';
import HarcamaUpdateReducers from './HarcamaUpdateReducer';

export default combineReducers({
  kimlikDogrulamaResponse: kimlikdogrulamaReducers,
  harcamaOlusturResponse: HarcamaOlusturReducers,
  harcamaDataResponse: HarcamaDataReducers,
  harcamaUpdateResponse: HarcamaUpdateReducers,
});
