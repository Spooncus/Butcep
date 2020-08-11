import React, {PureComponent} from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {harcamaDeleteClick} from '../actions';
//import Button from '../commons/Button';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Overlay from 'react-native-modal-overlay';
import Icon2 from 'react-native-vector-icons/Fontisto';

const {width, height} = Dimensions.get('window');

class ListHarcama extends PureComponent {
  state = {
    isHiddenPreview: false,
    fontLoaded: false,
    moved: false,
    scale: new Animated.Value(0),
    iconText: 'preview',
  };

  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
  }

  moveLeft = () => {
    const {moved} = this.state;

    Animated.spring(this.position, {
      toValue: {
        x: moved ? 0 : -180,
        y: 0,
      },
    }).start();

    Animated.spring(this.state.scale, {
      toValue: moved ? 0 : 1,
      duration: 800,
    }).start();

    this.setState({moved: !moved});
  };
  harcamaClick() {
    Actions.harcamaUpdate({harcama: this.props.harcama});
    const {moved} = this.state;

    Animated.spring(this.position, {
      toValue: {
        x: moved ? 0 : -180,
        y: 0,
      },
    }).start();

    Animated.spring(this.state.scale, {
      toValue: moved ? 0 : 1,
      duration: 800,
    }).start();

    this.setState({moved: !moved});
  }
  harcamaClickDelete() {
    this.props.harcamaDeleteClick({uid: this.props.harcama.uid});
    const {moved} = this.state;

    Animated.spring(this.position, {
      toValue: {
        x: moved ? 0 : -180,
        y: 0,
      },
    }).start();

    Animated.spring(this.state.scale, {
      toValue: moved ? 0 : 1,
      duration: 800,
    }).start();

    this.setState({moved: !moved});
  }
  onClose = () => this.setState({isHiddenPreview: false});
  harcamaPreview() {
    this.setState({isHiddenPreview: true});
  }
  render() {
    const {firma, aciklama, fiyat, tarih, kategori} = this.props.harcama;
    if (kategori === 'Akaryakıt') {
      this.setState({iconText: 'fire'});
    } else if (kategori === 'Alış-veriş') {
      this.setState({iconText: 'shopping-cart'});
    } else if (kategori === 'Ulaşım ve Seyahat') {
      this.setState({iconText: 'bus'});
    } else if (kategori === 'Restoran-Kafe') {
      this.setState({iconText: 'cutlery'});
    } else if (kategori === 'Konut ve Kira') {
      this.setState({iconText: 'home'});
    } else if (kategori === 'Haberleşme') {
      this.setState({iconText: 'phone'});
    } else if (kategori === 'Sağlık') {
      this.setState({iconText: 'medkit'});
    } else if (kategori === 'Kültür, Eğlence') {
      this.setState({iconText: 'paint-brush'});
    } else if (kategori === 'Eğitim - Kırtasiye') {
      this.setState({iconText: 'book'});
    } else {
      this.setState({iconText: 'user'});
    }
    //---------------------------------TARİH-TÜRKÇELEŞTİRME-İŞLEMLERİ-------------------------------------------------------------
    //günü sayısallaştırma
    var day = tarih.toString().substring(0, 2);
    //ay listesi
    var months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    var aylarTr = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    //ayı ve yılı sayısallaştırma
    var month = [];
    var dateHolder = [];
    var monthstr = tarih.toString().substring(3, 6);
    for (var j = 0; j < 12; j++) {
      if (monthstr.includes(months[j])) {
        month += aylarTr[j];
      }
    }
    dateHolder = tarih.toString();
    var year = Number(dateHolder.substring(dateHolder.length - 4));
    //---------------------------------TARİH-TÜRKÇELEŞTİRME-İŞLEMLERİ-------------------------------------------------------------
    return (
      <Animated.View
        onPress={this.moveLeft}
        style={[this.position.getLayout(), styles.wrap]}>
        {this.state.isHiddenPreview ? (
          <Overlay
            containerStyle={{backgroundColor: 'rgba(25, 25, 25, 0.68)'}}
            animationType="fadeInLeft"
            visible={this.state.isHiddenPreview}
            onClose={this.onClose}
            closeOnTouchOutside>
            <Text>Firma: {firma}</Text>
            <Text>Açıklama: {aciklama}</Text>
            <Text>Kategori: {kategori}</Text>
            <Text>Tarih: {tarih}</Text>
            <Text>Harcama: {fiyat}₺</Text>
          </Overlay>
        ) : null}
        <TouchableOpacity onPress={this.harcamaPreview.bind(this)} style={styles.container}>
        <View style={styles.iconLeft}>
        <Icon
                size={30}
                name={this.state.iconText}
                type="font-awesome"
                color="#fdc514"
              />
        </View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 20, color: '#555'}}>{kategori}</Text>
            <Text style={{fontSize: 20, color: '#3e9c65'}}>
              {'Harcama:' + fiyat + '₺'}
            </Text>
            <Text style={{fontSize: 16, color: '#555'}}>
              {'Tarih: ' + day + ' ' + month + ' ' + year}
            </Text>
          </View>
          <Button
            buttonStyle={styles.iconRight}
            onPress={this.moveLeft} //sol aç kapa
            icon={
              <Icon
                size={30}
                name={this.state.moved ? 'undo' : 'cog'}
                type="font-awesome"
                color="#fff"
              />
            }
          />
        </TouchableOpacity>
        <Animated.View
          onPress={this.harcamaClick.bind(this)}
          style={{transform: [{scale: this.state.scale}]}}>
          <Button
            buttonStyle={styles.iconBehind}
            onPress={this.harcamaClick.bind(this)} //sol iç 1
            icon={
              <Icon size={30} name="edit" type="font-awesome" color="#fff" />
            }
          />
        </Animated.View>
        <Animated.View
          onPress={this.harcamaClickDelete.bind(this)}
          style={{transform: [{scale: this.state.scale}]}}>
          <Button
            buttonStyle={styles.iconBehind} //sol iç 2
            onPress={this.harcamaClickDelete.bind(this)}
            icon={
              <Icon size={30} name="trash" type="font-awesome" color="#fff" />
            }
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

ListHarcama.propTypes = {
  remove: PropTypes.func,
  showList: PropTypes.func,
  addMore: PropTypes.func,
  incomes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  const: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 80,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
  },
  container: {
    width: width - 10,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 80,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    height: 80,
    width: 80,
  },
  iconRight: {
    borderRadius: 50,
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#fdc514',
  },
  iconBehind: {
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 50,
    height: 80,
    width: 80,
    backgroundColor: '#fdc514',
  },
});

const mapToStateProps = ({harcamaUpdateResponse}) => {
  const {loadingDelete} = harcamaUpdateResponse;
  return {
    loadingDelete,
  };
};
export default connect(
  mapToStateProps,
  {harcamaDeleteClick},
)(ListHarcama);
