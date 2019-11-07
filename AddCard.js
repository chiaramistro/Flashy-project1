import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      front: '',
      back: '',
      isValid: false,
    };
  }

  //Functions to handle changes in the input field
  handleFrontChange = front => {
    this.setState({ front: front }, this.validateForm);
  };

  handleBackChange = back => {
    this.setState({ back: back }, this.validateForm);
  };

  validateForm = () => {
    this.setState({ isValid: true });
  };

  //Data of input field is submitted
  handleSubmit = () => {
    this.props.onSubmit({ front: this.state.front, back: this.state.back });
  };

  //The user can enter the 'front' part and the 'back' part of the new card
  render() {
    return (
      <View>
        <Text style={styles.paragraph2}>Enter your new card </Text>
        <Text style={styles.paragraph2}>Front:</Text>
        <TextInput
          style={styles.input}
          value={this.state.front}
          onChangeText={this.handleFrontChange}
        />
        <Text style={styles.paragraph2}>Back:</Text>
        <TextInput
          style={styles.input}
          value={this.state.back}
          onChangeText={this.handleBackChange}
        />
        <Button
          title="Confirm"
          color="#f9af00"
          onPress={this.handleSubmit}
          disabled={!this.state.isValid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 20,
  },
  paragraph2: {
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});
