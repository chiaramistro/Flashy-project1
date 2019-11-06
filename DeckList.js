import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import decks from './flashcards';
import Deck from './Deck';
import AddDeck from './AddDeck';

export default class DeckList extends React.Component {
  
  state = {
    decks: decks,
    chosenDeckIndex: 0,
    chosenDeckName: '',
    chosenDeckCards: null,
    chosenDeck: false,
    add: false,
    deleteDeck: false,
  };

  chooseDeck(deck) {
    this.setState({
      chosenDeckIndex: deck.index,
      chosenDeckName: deck.name,
      chosenDeckCards: deck.cards,
    });
    this.setState({ chosenDeck: true });
  }

  addDeck() {
    this.setState({ add: true });
  }

  addNewDeck = newDeck => {
    this.setState(prev => ({ decks: [...prev.decks, newDeck] }));
    this.setState({ add: false });
  };

  deleteDeck() {
    this.setState({ deleteDeck: true });
  }

  deleteThisDeck(deckToDelete) {
    var newDecks = [];

    this.state.decks.map(deck => {
      if (deck.name !== deckToDelete.name) {
        newDecks = [...newDecks, deck];
      }
    });

    this.setState({ decks: newDecks });
    this.setState({ deleteDeck: false });
  }

  goBack1() {
    this.setState({ chosenDeck: false });
  }

  goBack2() {
    this.setState({ add: false });
  }

  goBack3() {
    this.setState({ deleteDeck: false });
  }

  render() {
    if (this.state.chosenDeck) {
      return (
        <View style={styles.container}>
          <Deck
            key={this.state.chosenDeckIndex}
            name={this.state.chosenDeckName}
            cards={this.state.chosenDeckCards}
          />
          <Text> </Text>
          <Button color='#f9af00' title="Home" onPress={() => this.goBack1()} />
        </View>
      );
    }

    if (this.state.add) {
      return (
        <View>
          <AddDeck onSubmit={this.addNewDeck} />
          <Text>  </Text>
          <Button color='#f9af00' title="Home" onPress={() => this.goBack2()} />
        </View>
      );
    }

    if (this.state.deleteDeck) {
      return (
        <View>
          <Text style={styles.paragraph3}>
            Which deck do you want to delete?
          </Text>
          {this.state.decks.map(deck => {
            return (
              <View style={styles.container}>
                <Button
                  color='#f9af00'
                  title={deck.name}
                  onPress={() => this.deleteThisDeck(deck)}
                />
              </View>

            );
          })}
          <Button color='#f9af00' title="Home" onPress={() => this.goBack3()} />
        </View>
      );
    }

    return (
      <View>
      <Text style={styles.paragraph2}>Welcome!{'\n'}Are you ready to study?{'\n'}To begin, choose a deck of cards{'\n'}or create a brand new.</Text>
      <Text> </Text>
        {this.state.decks.map(deck => {
          return (
            <View>
              <Button color='#f9af00' 
              title={deck.name} onPress={() => this.chooseDeck(deck)} />
              <Text> </Text>
            </View>
          );
        })}
        <Button color='#f9af00' title="Add deck" onPress={() => this.addDeck()} />
        <Button color='#f9af00' title="Delete deck" onPress={() => this.deleteDeck()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fffca8',
  },
  paragraph2: {
    margin: 9,
    fontSize: 15,
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 4,
  },
   paragraph3: {
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});
