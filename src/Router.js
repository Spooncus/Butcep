import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HarcamaOlustur from './components/HarcamaOlustur';
import HarcamaList from './components/HarcamaList';
import HarcamaUpdate from './components/HarcamaUpdate';
import Menu from './components/Menu';
import VeriCek from './components/VeriCek';
import Raporlar from './components/Raporlar';
import SplashScreen from './components/SplashScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="kimlik">
        <Scene key="loading" component={SplashScreen} initial={true} hideNavBar={true}></Scene>
        <Scene key="login" component={LoginForm} hideNavBar />
        <Scene
          key="register"
          component={RegisterForm}
          title="Kayit Ekrani"
          hideNavBar
        />
        <Scene
          key="raporlar"
          component={Raporlar}
          title="Raporlar"
        />
        <Scene
          key="harcamaOlustur"
          component={HarcamaOlustur}
          title="Yeni Harcama Oluştur"
        />
        <Scene
          onBack={() => Actions.Menu()}
          onRight={() => Actions.harcamaOlustur()}
          rightTitle="Oluştur"
          title="Son Harcamalar"
          key="harcamaList"
          component={HarcamaList}
        />
        <Scene
          key="harcamaUpdate"
          component={HarcamaUpdate}
          title="Geçmiş Harcamayı Güncelle"
        />
        <Scene key="Menu" component={Menu} title="Menu" hideNavBar />
        <Scene key="veriCek" component={VeriCek} title="Tahminler" hideNavBar/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
