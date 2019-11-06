import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cards: [{front: '', back: ''}],
      isValid: false,
    };
  }

  handleDeckChange = deckName => {
    this.setState({ name: deckName }, this.validateForm);
  };

  validateForm = () => {
    this.setState({ isValid: true });
  };

  handleSubmit = () => {
    this.props.onSubmit({ name: this.state.name, cards: this.state.cards });
  };

  render() {
    return (
      <View>
        <Text style={styles.paragraph}>Enter your new deck</Text>
        <TextInput
          style={styles.input}
          value={this.state.front}
          onChangeText={this.handleDeckChange}
        />
        <Button
          title="Confirm"
          color='#f9af00'
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
  paragraph: {
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});
