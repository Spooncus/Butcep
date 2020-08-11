import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, FlatList, ImageBackground, Dimensions, Animated,ScrollView,StyleSheet,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {harcamaListData} from '../actions';
import ListHarcama from './ListHarcama';
import Header from '../ortak/Header';

//onRight={() => Actions.harcamaOlustur()}
const { width, height } = Dimensions.get('window');

class HarcamaList extends Component {
  componentDidMount() {
    this.props.harcamaListData();
  }
  renderRow({item, index}) {
    if (index <= 14) return <ListHarcama harcama={item} />;
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../img/3147.jpg')} style={{flex:1}}>
          
            <FlatList
                style={{width:width,}}
                data={this.props.harcamaArray}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
          
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({harcamaDataResponse}) => {
  const harcamaArray = _.map(harcamaDataResponse, (val, uid) => {
    return {...val, uid};
  });
  return {harcamaArray};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    
  },
  text: {
    fontSize: 42,
  },
});

export default connect(mapStateToProps, {harcamaListData}) (HarcamaList);
