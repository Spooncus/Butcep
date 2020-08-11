/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Card, CardSection, Spinner} from '../ortak';
import {Button} from 'react-native-elements';
import {harcamaDegis, harcamaOlustur, harcamaIptal} from '../actions';
import BigButton from '../ortak/BigButton';
import Button2 from '../ortak/Button2';

const {width, height} = Dimensions.get('window');

class HarcamaOlustur extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: 'Tarih ',
    kategoriPicked: 'Kategori Seçiniz',
    isHidden: false,
    isHiddenCheck: false,
  };
  clickSave() {
    const {firma, aciklama, fiyat, tarih, kategori} = this.props;
    this.props.harcamaOlustur({firma, aciklama, fiyat, tarih, kategori});
  }
  clickIptal() {
    Actions.pop();
  }
  //this.clickSave.bind(this)
  renderSaveButton() {
    if (!this.props.loadingSave) {
      return (
        <Button2
          onPress={this.clickSave.bind(this)}
          text="Kaydet "
          icon={'save'}
          color={'limegreen'}
        />
      );
    }
    return <Spinner size="small" />;
  }
  renderCancelButton() {
    if (!this.props.loadingCancel) {
      return (
        <Button2
          onPress={this.clickIptal.bind(this)}
          text="İptal "
          icon={'close'}
          color={'crimson'}
        />
      );
    }
    return <Spinner size="small" />;
  }
  renderTarihButton() {
    return (
      <Button2
        style={styles.dateButton}
        onPress={this.showDateTimePicker}
        text={this.state.selectedDate}
        icon={'calendar'}
        color={'#ffd700'}
      />
    );
  }
  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };
  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  handleDatePicked = date => {
    //---------------------------------TARİH-TÜRKÇELEŞTİRME-İŞLEMLERİ-------------------------------------------------------------
    //günü sayısallaştırma
    var day = date.toString().substring(8, 10);
    //ay listesi
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var aylarTr = [
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
    //ayı sayısallaştırma
    var month = [];
    var monthstr = date.toString().substring(4, 7);
    for (var j = 0; j < 12; j++) {
      if (monthstr.includes(months[j])) {
        month += aylarTr[j];
      }
    }
    //yılı sayısallaştırma
    var year = date.toString().substring(11, 15);
    var press = day+'/'+month+'/'+year;
    //---------------------------------TARİH-TÜRKÇELEŞTİRME-İŞLEMLERİ-------------------------------------------------------------
    this.setState({selectedDate: press});
    this.props.harcamaDegis({props: 'tarih', value: this.state.selectedDate});
    this.hideDateTimePicker();
  };
  handleKategoriPicked = kategoriPicked => {
    this.setState({kategoriPicked: kategoriPicked});
    if (kategoriPicked === 'DIGER') {
      this.setState({isHidden: !this.state.isHidden});
      this.setState({isHiddenCheck: true});
    } else {
      if (this.state.isHiddenCheck) {
        this.setState({isHiddenCheck: !this.state.isHiddenCheck});
        this.setState({isHidden: !this.state.isHidden});
      }
      this.props.harcamaDegis({props: 'kategori', value: kategoriPicked});
    }
  };

  render() {
    const {isDateTimePickerVisible, isHidden} = this.state;
    const {inputStyle} = styles;
    return (
      <ImageBackground
        source={require('../../img/3147.jpg')}
        style={{width, height, alignItems: 'center'}}>
        <KeyboardAvoidingView
          style={{width, height, alignItems: 'center'}}
          behavior="padding"
          enabled>
          <Card>
            <CardSection>
              <TextInput
                placeholder="Firma"
                style={inputStyle}
                value={this.props.firma}
                maxLength={10}
                onChangeText={firma =>
                  this.props.harcamaDegis({props: 'firma', value: firma})
                }
              />
            </CardSection>
            <CardSection>
              <TextInput
                placeholder="Açıklama"
                style={inputStyle}
                value={this.props.aciklama}
                maxLength={40}
                onChangeText={aciklama =>
                  this.props.harcamaDegis({props: 'aciklama', value: aciklama})
                }
              />
            </CardSection>
            <CardSection>
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.kategoriPicked}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleKategoriPicked(itemValue)
                }>
                <Picker.Item label="Kategori Seçiniz" value="" />
                <Picker.Item label="Akaryakıt" value="Akaryakıt" />
                <Picker.Item label="Alış-veriş" value="Alış-veriş" />
                <Picker.Item
                  label="Ulaşım ve Seyahat"
                  value="Ulaşım ve Seyahat"
                />
                <Picker.Item label="Restoran-Kafe" value="Restoran-Kafe" />
                <Picker.Item label="Konut ve Kira" value="Konut ve Kira" />
                <Picker.Item label="Haberleşme" value="Haberleşme" />
                <Picker.Item label="Sağlık" value="Sağlık" />
                <Picker.Item label="Kültür, Eğlence" value="Kültür, Eğlence" />
                <Picker.Item
                  label="Eğitim - Kırtasiye"
                  value="Eğitim - Kırtasiye"
                />
                <Picker.Item label="Diğer (Belirtiniz)" value="DIGER" />
              </Picker>
            </CardSection>
            {isHidden ? (
              <CardSection>
                <TextInput
                  placeholder="Kategori"
                  style={inputStyle}
                  value={this.props.kategori}
                  maxLength={20}
                  onChangeText={kategori =>
                    this.props.harcamaDegis({
                      props: 'kategori',
                      value: kategori,
                    })
                  }
                />
              </CardSection>
            ) : null}
            <CardSection>
              {this.renderTarihButton()}
              <DateTimePicker
                mode={'date'}
                isVisible={isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </CardSection>
            <CardSection>
              <TextInput
                placeholder="Fiyat"
                style={inputStyle}
                value={this.props.fiyat}
                keyboardType={'numeric'}
                onChangeText={fiyat =>
                  this.props.harcamaDegis({props: 'fiyat', value: fiyat})
                }
              />
            </CardSection>
            
          </Card>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.7,
              }}>
              {this.renderCancelButton()}
              {this.renderSaveButton()}
            </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    borderRadius: 8,
    justifyContent: 'center',
    height: height * 0.01,
    width: width * 0.45,
    backgroundColor: '#fdc514',
    marginTop: 10,
  },
};

const mapToStateProps = ({harcamaOlusturResponse}) => {
  const {
    firma,
    aciklama,
    fiyat,
    tarih,
    kategori,
    loadingSave,
    loadingCancel,
  } = harcamaOlusturResponse;
  return {
    firma,
    aciklama,
    fiyat,
    tarih,
    kategori,
    loadingSave,
    loadingCancel,
  };
};

export default connect(
  mapToStateProps,
  {harcamaDegis, harcamaOlustur, harcamaIptal},
)(HarcamaOlustur);
