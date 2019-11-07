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
    newCards: [],
  };

  //Called when one of the decks that are shown by the DeckList component
  //is chosen. After one of them is chosen, another component is shown,
  //showing all the information belonging to the specific deck

  chooseDeck(deck, index) {
    this.setState({
      chosenDeckIndex: index,
      chosenDeckName: deck.name,
      chosenDeckCards: deck.cards,
    });

    //To-do
    //To ensure that the cards previously added are still visible,
    //a filter should be implemented on 'newCards' to check if there are
    //some new cards that belong to the chosen deck.
    //The function should be similar also for deleting a card from a deck.

    this.setState({ chosenDeck: true });
  }

  //Called to show the component AddDeck
  addDeck() {
    this.setState({ add: true });
  }

  //Handle response data from AddDeck
  addNewDeck = newDeck => {
    this.setState(prev => ({ decks: [...prev.decks, newDeck] }));
    this.setState({ add: false });
  };

  //Called to show the possible deleatable decks
  deleteDeck() {
    this.setState({ deleteDeck: true });
  }

  //Called to delete a specific deck of cards
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

  //Go-back functions for buttons
  goBack1() {
    this.setState({ chosenDeck: false });
  }

  goBack2() {
    this.setState({ add: false });
  }

  goBack3() {
    this.setState({ deleteDeck: false });
  }

  //Handle response data from AddCard
  addNewCard = newCard => {
    this.setState(prev => ({ newCards: [...prev.newCards, newCard] }));
  };

  render() {
    //After one of the decks is chosen, this view is shown,
    //which is composed by a Deck component, showing all the information
    //regarding the specific deck

    if (this.state.chosenDeck) {
      return (
        <View style={styles.container}>
          <Deck
            keyy={this.state.chosenDeckIndex}
            name={this.state.chosenDeckName}
            cards={this.state.chosenDeckCards}
            onSubmit={this.addNewCard}
          />
          <Text> </Text>
          <Button color="#f9af00" title="Home" onPress={() => this.goBack1()} />
        </View>
      );
    }

    //Showing the component AddDeck
    if (this.state.add) {
      return (
        <View>
          <AddDeck onSubmit={this.addNewDeck} />
          <Text> </Text>
          <Button color="#f9af00" title="Home" onPress={() => this.goBack2()} />
        </View>
      );
    }

    //Showing the possible deleatable decks
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
                  color="#f9af00"
                  title={deck.name}
                  onPress={() => this.deleteThisDeck(deck)}
                />
              </View>
            );
          })}
          <Button color="#f9af00" title="Home" onPress={() => this.goBack3()} />
        </View>
      );
    }

    //DeckList component, showing the available decks from which the user can choose
    return (
      <View>
        <Text style={styles.paragraph2}>
          Welcome!{'\n'}Are you ready to study?{'\n'}To begin, choose a deck of
          cards{'\n'}or create a brand new.
        </Text>
        <Text> </Text>
        {this.state.decks.map((deck, index) => {
          return (
            <View>
              <Button
                color="#f9af00"
                title={deck.name}
                onPress={() => this.chooseDeck(deck, index)}
              />
              <Text> </Text>
            </View>
          );
        })}
        <Button
          color="#f9af00"
          title="Add deck"
          onPress={() => this.addDeck()}
        />
        <Button
          color="#f9af00"
          title="Delete deck"
          onPress={() => this.deleteDeck()}
        />
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
