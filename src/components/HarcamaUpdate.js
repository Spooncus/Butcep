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
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Card, CardSection, Spinner} from '../ortak';
import {harcamaDegis, harcamaUpdate, harcamaDelete} from '../actions';
import {Button, ThemeConsumer} from 'react-native-elements';
import Button2 from '../ortak/Button2';

const {width, height} = Dimensions.get('window');

class HarcamaUpdate extends Component {
  state = {
    firma: '',
    aciklama: '',
    fiyat: '',
    tarih: '',
    kategori: '',
    isDateTimePickerVisible: false,
    selectedDate: 'Tarih',
    kategoriPicked: '',
  };
  componentWillMount() {
    const {firma, aciklama, fiyat, tarih, kategori} = this.props.harcama;
    this.setState({firma, aciklama, fiyat, tarih, kategori});
    this.setState({kategoriPicked: this.props.kategori});
  }
  clickUpdate() {
    const {firma, aciklama, fiyat, tarih, kategori} = this.state;
    this.props.harcamaUpdate({
      firma,
      aciklama,
      fiyat,
      tarih,
      kategori,
      uid: this.props.harcama.uid,
    });
  }
  clickDelete() {
    this.props.harcamaDelete({uid: this.props.harcama.uid});
  }
  renderButton() {
    if (!this.props.loadingUpdate) {
      return (
        <Button2
          onPress={this.clickUpdate.bind(this)}
          text="Güncelle "
          icon={'refresh'}
          color={'dodgerblue'}
        />
      );
    }
    return <Spinner size="small" />;
  }
  renderDeleteButton() {
    if (!this.props.loadingDelete) {
      return (
        <Button2
          onPress={this.clickDelete.bind(this)}
          text="Sil "
          icon={'trash'}
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
        text={this.state.tarih}
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
    this.setState({selectedDate: date.toString().substring(4, 16)});
    this.props.harcamaDegis({props: 'tarih', value: this.state.selectedDate});
    this.hideDateTimePicker();
  };
  handleKategoriPicked = kategoriPicked => {
    this.setState({kategori: kategoriPicked});
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
        style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
        <KeyboardAvoidingView
          style={{width, height, alignItems: 'center'}}
          behavior="padding"
          enabled>
          <Card>
            <CardSection>
              <TextInput
                placeholder="Firma"
                style={inputStyle}
                value={this.state.firma}
                maxLength={10}
                onChangeText={firma => this.setState({firma})}
              />
            </CardSection>
            <CardSection>
              <TextInput
                placeholder="Açıklama"
                style={inputStyle}
                value={this.state.aciklama}
                onChangeText={aciklama => this.setState({aciklama})}
              />
            </CardSection>
            <CardSection>
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.kategori}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleKategoriPicked(itemValue)
                }>
                <Picker.Item label="Kategori Seçiniz" value="" />
                <Picker.Item label="Akaryakıt" value="Akaryakıt" />
                <Picker.Item label="Alış-veriş" value="Alış-veriş" />
                <Picker.Item label="Ulaşım" value="Ulaşım" />
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
                value={this.state.fiyat}
                keyboardType={'numeric'}
                onChangeText={fiyat => this.setState({fiyat})}
              />
            </CardSection>
          </Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',  width:width*0.7}}>
          {this.renderDeleteButton()}
                {this.renderButton()}
              </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const mapToStateProps = ({harcamaUpdateResponse}) => {
  const {loadingUpdate, loadingDelete} = harcamaUpdateResponse;
  return {
    loadingUpdate,
    loadingDelete,
  };
};

export default connect(
  mapToStateProps,
  {harcamaDegis, harcamaUpdate, harcamaDelete},
)(HarcamaUpdate);
