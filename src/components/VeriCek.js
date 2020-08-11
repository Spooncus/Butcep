import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, FlatList, ImageBackground, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {harcamaListData} from '../actions';
import {Button, Icon} from 'react-native-elements';
import timeseries from 'timeseries-analysis'
const {width, height} = Dimensions.get('window');

class VeriCek extends Component {
  state = {
    maxVeri: '',
    kategoriPicked: 'Tümü',
    monthPicked: 'Ocak',
    yearPicked: '2019',
    renderArray: [],
    toplam: 0,
    bugun: 'selam',
    datesToplamlar: [],
  };
  componentDidMount() {
    this.props.harcamaListData();
  }
  renderRow() {
    return null;
  }
 
  render() {
    var dailyresult=[];
    var t = new timeseries.main(timeseries.adapter.fromDB(this.props.spendingArray, {
      date: 'tarih',
      value: 'fiyat',
    }));
    var date = new timeseries.main(timeseries.adapter.fromDB(this.props.spendingArray, {
      value:  'tarih',
    })); 
    var myJSON = JSON.stringify(this.props.spendingArray);
    var dforecast    = 0;
    var wforecast    = 0;
    var mforecast    = 0;
    var thforecast   = 0;
    var yforecast    = 0;
  
  
//--------------------------------------VERİ-YAZMA-İŞLEMLERİ--------------------------BAŞ------------------------------------------
  var finaldata=[];
  var allvalue=[];
  var dayholder=0;
  var monthholder=0;
  var yearholder=0;


  for (i = 0; i < this.props.spendingArray.length; i++) {
    allvalue.push(this.props.spendingArray[i]["fiyat"]);
  }


//--------------------------------------VERİ-YAZMA-İŞLEMLERİ--------------------------SON------------------------------------------


 //---------------------------------ARANAN-GÜNÜN-VERİLERİ-TOPLAMI---------------------BAŞ------------------------------------------
    
    var dailyfinal=0;
    var dailyfinalstr=[];

    var monthlyfinal=0;
    var monthlyfinalstr=[];

    var weeklyfinal=0;
    var weeklyfinalstr=[];
    
    var d = new Date();
    //günlük
    for(var k = 0; k < 10; k++){
      var last = new Date(d - k * 24 * 60 * 60 * 1000);
      var daye;
      var dayee = last.getDate();
      var günlersayi = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15',
      '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
      for(var gün=1;gün<32;gün++){
        if(dayee==gün){
          daye=günlersayi[gün-1];
        }
      }
      var monthe;
      var monthee = last.getMonth()+1;
      var aylarsayi = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      for(var ay=1;ay<13;ay++){
        if(monthee==ay){
          monthe=aylarsayi[ay-1];
        }
      }
      var yeare = last.getFullYear()
      var thisday = daye + '/' + monthe + '/' + yeare;
      for (var i = 0; i < this.props.spendingArray.length; i++) {
        var datadate=this.props.spendingArray[i]["tarih"];
            if(datadate==thisday){
              var sonucgun=Number(this.props.spendingArray[i]["fiyat"]);
              dailyfinal+=sonucgun;
              sonucgun=0;
            }
      }
      dailyfinalstr.push(dailyfinal);
      
    }
    //aylık
    for(var k = 0; k < 30; k++){
      var last = new Date(d - k * 24 * 60 * 60 * 1000);
      var daye;
      var dayee = last.getDate();
      var günlersayi = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15',
      '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
      for(var gün=1;gün<32;gün++){
        if(dayee==gün){
          daye=günlersayi[gün-1];
        }
      }
      var monthe;
      var monthee = last.getMonth()+1;
      var aylarsayi = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      for(var ay=1;ay<13;ay++){
        if(monthee==ay){
          monthe=aylarsayi[ay-1];
        }
      }
      var yeare = last.getFullYear()
      var thisday = daye + '/' + monthe + '/' + yeare;
      for (var i = 0; i < this.props.spendingArray.length; i++) {
        var datadate=this.props.spendingArray[i]["tarih"];
            if(datadate==thisday){
              var sonucay=Number(this.props.spendingArray[i]["fiyat"]);
              monthlyfinal+=sonucay;
              sonucay=0;
            }
      }
      monthlyfinalstr.push(monthlyfinal);
      
    }
    //haftalık
    for(var k = 0; k < 14; k++){
      var last = new Date(d - k * 24 * 60 * 60 * 1000);
      var daye;
      var dayee = last.getDate();
      var günlersayi = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15',
      '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
      for(var gün=1;gün<32;gün++){
        if(dayee==gün){
          daye=günlersayi[gün-1];
        }
      }
      var monthe;
      var monthee = last.getMonth()+1;
      var aylarsayi = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      for(var ay=1;ay<13;ay++){
        if(monthee==ay){
          monthe=aylarsayi[ay-1];
        }
      }
      var yeare = last.getFullYear()
      var thisday = daye + '/' + monthe + '/' + yeare;
      for (var i = 0; i < this.props.spendingArray.length; i++) {
        var datadate=this.props.spendingArray[i]["tarih"];
            if(datadate==thisday){
              var sonuchafta=Number(this.props.spendingArray[i]["fiyat"]);
              weeklyfinal+=sonuchafta;
              sonuchafta=0;
            }
      }
      weeklyfinalstr.push(weeklyfinal);
      
    }
    for(var a=9;a>0;a--){
      dailyfinalstr[a]=dailyfinalstr[a]-dailyfinalstr[a-1];
      if(dailyfinalstr[a]=='NotANumber'){
        dailyfinalstr[a]=dailyfinalstr[a+1];
      }

    }

    for(var a=29;a>0;a--){
      monthlyfinalstr[a]=monthlyfinalstr[a]-monthlyfinalstr[a-1];
      if(monthlyfinalstr[a]=='NotANumber'){
        monthlyfinalstr[a]=monthlyfinalstr[a+1];
      }

    }
    for(var a=13;a>0;a--){
      weeklyfinalstr[a]=weeklyfinalstr[a]-weeklyfinalstr[a-1];
      if(weeklyfinalstr[a]=='NotANumber'){
        weeklyfinalstr[a]=weeklyfinalstr[a+1];
      }
    }
    monthlyfinalstr.reverse();
    weeklyfinalstr.reverse();
    dailyfinalstr.reverse();
  //---------------------------------ARANAN-GÜNÜN-VERİLERİ-TOPLAMI---------------------SON------------------------------------------
  
    var d= new timeseries.main(timeseries.adapter.fromArray(dailyfinalstr));
    var dcoeffs = d.ARMaxEntropy({degree: 5});
    for (var i=0;i<dcoeffs.length;i++) {
        dforecast -= d.data[(dailyfinalstr.length-1)-i][1]*dcoeffs[i];
        }
        if(dforecast<0){
          dforecast=0;
        }
    var w= new timeseries.main(timeseries.adapter.fromArray(weeklyfinalstr));
    var wcoeffs = w.ARMaxEntropy({degree: 2});
    for (var i=0;i<wcoeffs.length;i++) {
      
        wforecast -= w.data[(weeklyfinalstr.length-1)-i][1]*wcoeffs[i];
        }
        if(wforecast<0){
          wforecast=0;
        }
     var m= new timeseries.main(timeseries.adapter.fromArray(monthlyfinalstr));
      var mcoeffs = m.ARMaxEntropy({degree: 2});
      for (var i=0;i<mcoeffs.length;i++) {
          mforecast -= m.data[(monthlyfinalstr.length-1)-i][1]*mcoeffs[i];
          }
          if(mforecast<0){
            mforecast=0;
          }                 
    return (
      <View>
        <FlatList
          data={this.props.spendingArray}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString}
        />
        <ImageBackground
        source={require('../../img/3147.jpg')}
        style={{width, height, }}>
          <View style={styles.container}>
          <View style={styles.iconLeft}>
          <Text style={{justifyContent:'flex-end',alignSelf:'center',fontSize:35,color:'#fff'}}>G</Text>
          </View>
          <Text style={{justifyContent:'flex-end',alignSelf:'center',}}> Günlük Tahmini Harcamanız:{dforecast.toFixed(0)}₺</Text>
          </View>
          <View style={styles.container}>
          <View style={styles.iconLeft}>
          <Text style={{justifyContent:'flex-end',alignSelf:'center',fontSize:35,color:'#fff'}}>H</Text>
          </View>
          <Text style={{justifyContent:'center',alignSelf:'center',color:'#000'}}> Haftalık Tahmini Harcamanız:{(wforecast*7).toFixed(2)}₺</Text>
          </View>
          <View style={styles.container}>
          <View style={styles.iconLeft}>
          <Text style={{justifyContent:'flex-end',alignSelf:'center',fontSize:35,color:'#fff'}}>A</Text>
          </View>
          <Text style={{justifyContent:'center',alignSelf:'center',color:'#000'}}> Aylık Tahmini Harcamanız:{(mforecast*30).toFixed(2)}₺</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = ({harcamaDataResponse}) => {
  const spendingArray = _.map(harcamaDataResponse, (val, uid) => {
    return {...val, uid};
  });
  return {spendingArray};
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
    marginLeft:5,
    marginTop: 10,
    width: width - 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 80,
    borderRadius: 3,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    borderRadius: 3,
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    height: 80,
    width: 80,
  },
  iconRight: {
    borderRadius: 50,
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#000',
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

export default connect(mapStateToProps, {harcamaListData})(VeriCek);