import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

class ForecastShow extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: '',
    deneme: '',
  };
  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  parseDate = date => {
    this.setState({deneme: date.toString().substring(8,10)});
  };
  handleDatePicked = date => {
    this.setState({selectedDate: date.toString()});
    this.parseDate(date);
    this.hideDateTimePicker();
  };
  render() {
    const {isDateTimePickerVisible, selectedDate, deneme} = this.state;
    return (
      <View style={styles.container}>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <Text style={styles.text}>
          {selectedDate} can berk {deneme}
        </Text>
        <DateTimePicker
          mode={'date'}
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 10
  }
});
export default ForecastShow;
