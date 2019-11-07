import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Deck from './Deck';

export default class RenameDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: props.key,
      name: props.name,
      cards: props.cards,
      isValid: false,
      submitted: false,
    };
  }

  //Function to handle changes in the input field
  handleNameChange = name => {
    this.setState({ name: name }, this.validateForm);
  };

  validateForm = () => {
    this.setState({ isValid: true });
  };

  //Data of input field is submitted
  handleSubmit = () => {
    this.props.onSubmit({ name: this.state.name });
  };

  //The user can enter the new name for an already-existing deck
  render() {
    return (
      <View>
        <Text style={styles.paragraph2}>New name:</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleNameChange}
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
