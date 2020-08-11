import _ from 'lodash';
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ImageBackground,
  Dimensions,
  Picker,
  Animated,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {harcamaListData} from '../actions';
import ListHarcama from './ListHarcama';
import {CardSection} from '../ortak';

const {width, height} = Dimensions.get('window');

class Raporlar extends Component {
  state = {
    maxVeri: '',
    kategoriPicked: 'Tümü',
    monthPicked: '01',
    yearPicked: '2020',
    renderArray: [],
    toplam: 0,
  };
  componentDidMount() {
    this.props.harcamaListData();
  }
  renderRow({item, index}) {
    return <ListHarcama harcama={item} />;
  }
  handleKategoriPicked = kategori => {
    this.setState({kategoriPicked: kategori});
  };
  handleMonthPicked = month => {
    this.setState({monthPicked: month});
  };
  handleYearPicked = year => {
    this.setState({yearPicked: year});
  };
  setData() {
    const verilerData = [];
    var year = this.state.yearPicked;
    var ocakToplam = 0;
    for (var i = 0; i < this.props.harcamaArray.length; i++) {
      if (this.props.harcamaArray[i]["tarih"].substring(6, 10) === year && this.props.harcamaArray[i]["tarih"].substring(3,5) === this.state.monthPicked) {
        if (this.state.kategoriPicked == "Tümü") {
          verilerData.push(this.props.harcamaArray[i]);
          ocakToplam += Number(this.props.harcamaArray[i]["fiyat"]);
        } else {
          if (
            this.props.harcamaArray[i]["kategori"] == this.state.kategoriPicked
          ) {
            verilerData.push(this.props.harcamaArray[i]);
          }
        }
      }
    }
    verilerData.reverse();
    this.setState({renderArray: verilerData});
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../img/3147.jpg')}
          style={{flex: 1}}>
          <ScrollView style={styles.scrollView}>
            <CardSection>
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.kategoriPicked}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleKategoriPicked(itemValue)
                }>
                <Picker.Item label="Tümü" value="Tümü" />
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
              </Picker>
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.monthPicked}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleMonthPicked(itemValue)
                }>
                <Picker.Item label="Ocak" value="01" />
                <Picker.Item label="Şubat" value="02" />
                <Picker.Item label="Mart" value="03" />
                <Picker.Item label="Nisan" value="04" />
                <Picker.Item label="Mayıs" value="05" />
                <Picker.Item label="Haziran" value="06" />
                <Picker.Item label="Temmuz" value="07" />
                <Picker.Item label="Ağustos" value="08" />
                <Picker.Item label="Eylül" value="09" />
                <Picker.Item label="Ekim" value="10" />
                <Picker.Item label="Kasım" value="11" />
                <Picker.Item label="Aralık" value="12" />
              </Picker>
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.yearPicked}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleYearPicked(itemValue)
                }>
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
              </Picker>
              <Button onPress={this.setData.bind(this)} title= 'getir'/>
            </CardSection>
            <FlatList
              style={{width: width}}
              data={this.state.renderArray}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  text: {
    fontSize: 42,
  },
});

const mapStateToProps = ({harcamaDataResponse}) => {
  const harcamaArray = _.map(harcamaDataResponse, (val, uid) => {
    return {...val, uid};
  });
  return {harcamaArray};
};

export default connect(
  mapStateToProps,
  {harcamaListData},
)(Raporlar);
