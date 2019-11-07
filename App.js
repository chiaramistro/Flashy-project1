import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import DeckList from './DeckList';

export default class App extends React.Component {
  //Home screen of the application, showing the list
  //of the available decks
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}> Flashy </Text>
        <DeckList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fffca8',
    padding: 30,
  },
  paragraph: {
    margin: 10,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
