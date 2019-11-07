import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import Card from './Card';
import AddCard from './AddCard';
import RenameDeck from './RenameDeck';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyy: props.keyy,
      name: props.name,
      cards: props.cards,
      chosen: false,
      rename: false,
      add: false,
      end: false,
      index: 0,
      timeTaken: 0,
      guesses: [],
      rightGuesses: [],
      wrongGuesses: [],
      remaining: props.cards,
      deleteCard: false,
    };
  }

  //Called to show the component AddDeck
  chooseDeck() {
    this.setState({ chosen: true });
    setInterval(() => {
      this.setState({ timeTaken: this.state.timeTaken + 1 });
    }, 1000);
  }

  //If there are still cards to be shown inside the deck, then the
  //index is increased to show the remaining cards.
  //If the deck came to an end, then the cards in the deck are
  //finished and we perform the rearrangement, so that the cards
  //are ordered --> wrong cards + (rest of the cards, if any) + right cards.
  //Moreover, the wrong and the right cards are ordered from the biggest
  //to the smallest time taken to guess them.
  updateIndex() {
    if (this.state.index == this.state.cards.length - 1) {
      this.setState({ chosen: false });
      this.setState({ end: true });

      this.state.wrongGuesses.sort(function(a, b) {
        return b.timeTaken - a.timeTaken;
      });
      this.state.rightGuesses.sort(function(a, b) {
        return b.timeTaken - a.timeTaken;
      });

      const newGuesses = [
        ...this.state.wrongGuesses,
        ...this.state.rightGuesses,
      ];
      this.setState({
        guesses: newGuesses,
      });
      this.setState({ rightGuesses: [], wrongGuesses: [] });
    } else {
      this.setState(prev => ({ index: prev.index + 1 }));
      this.setState({ timeTaken: 0 });
    }
  }

  //Called to show the component RenameDeck
  rename() {
    this.setState({ rename: true });
  }

  //Handle response data from RenameDeck
  renameDeck = renamedDeck => {
    this.setState({ rename: false });
    this.setState({ name: renamedDeck.name });
  };

  //Called to show the component AddCard
  addCard() {
    this.setState({ add: true });
  }

  //Handle response data from AddCard
  addNewCard = newCard => {
    this.setState({ add: false });
    this.setState(prev => ({ cards: [...prev.cards, newCard] }));
    const currentKey = this.state.keyy;
    this.props.onSubmit({
      front: newCard.front,
      back: newCard.back,
      key: currentKey,
    });
  };

  //Callen when a card was guessed 'right', meaning that the user pressed the
  //button "right". The card is put inside an array containing all the right
  //guesses.
  considerRight() {
    const singleCard = {};
    singleCard['index'] = this.state.index;
    singleCard['front'] = this.state.cards[this.state.index].front;
    singleCard['back'] = this.state.cards[this.state.index].back;
    singleCard['timeTaken'] = this.state.timeTaken;

    const newRemaining = this.state.remaining.filter(function(item) {
      return item.front != singleCard.front;
    });

    this.setState(
      prev => ({
        rightGuesses: [...prev.rightGuesses, singleCard],
        remaining: newRemaining,
      }),
      () => this.updateIndex()
    );
  }
  //Callen when a card was guessed 'wrong', meaning that the user pressed the
  //button "wrong". The card is put inside an array containing all the wrong
  //guesses.
  considerWrong() {
    const singleCard = {};
    singleCard['index'] = this.state.index;
    singleCard['front'] = this.state.cards[this.state.index].front;
    singleCard['back'] = this.state.cards[this.state.index].back;
    singleCard['timeTaken'] = this.state.timeTaken;

    const newRemaining = this.state.remaining.filter(function(item) {
      return item.front != singleCard.front;
    });

    this.setState(
      prev => ({
        wrongGuesses: [...prev.wrongGuesses, singleCard],
        remaining: [...newRemaining],
      }),
      () => this.updateIndex()
    );
  }

  //After the user finishes the cards, it can begin to study them
  //all over again. However, a rearrangement is made so that the cards
  //are ordered in a specific way.
  tryAgain() {
    this.setState({ cards: this.state.guesses });
    this.setState({
      guesses: [],
      index: 0,
      timeTaken: 0,
      remaining: this.state.cards,
    });
    this.setState({ end: false });
    this.setState({ chosen: true });
  }

  //Called to show the possible deleatable cards
  deleteCard() {
    this.setState({ deleteCard: true });
  }

  //Called to delete a specific card
  deleteThisCard(cardToDelete) {
    var newCards = [];
    this.state.cards.map(card => {
      if (card.front !== cardToDelete.front) {
        newCards = [...newCards, card];
      }
    });
    this.setState({ cards: newCards });
    this.setState({ deleteCard: false });
  }

  //Called when the user wants to restart from scratch, without finishing
  //to read all the cards. Here a rearrangement is made, considering also
  //the 'remaining' cards, that is the cards that were not read by
  //the user
  restart() {
    const newGuesses = [
      ...this.state.wrongGuesses,
      ...this.state.remaining,
      ...this.state.rightGuesses,
    ];
    console.log(newGuesses);

    this.setState({ guesses: newGuesses });
    this.setState({ cards: newGuesses });

    this.setState({
      guesses: [],
      remaining: this.state.cards,
      wrongGuesses: [],
      rightGuesses: [],
      index: 0,
      timeTaken: 0,
    });
  }

  render() {
    //If the deck is chosen, the first card is shown
    if (this.state.chosen) {
      return (
        <View>
          <Text style={styles.paragraph}> {this.state.name} </Text>
          <Card
            key={this.state.index}
            front={this.state.cards[this.state.index].front}
            back={this.state.cards[this.state.index].back}
          />
          <View style={styles.fixToText}>
            <Button
              color="#00f933"
              title="    Right    "
              onPress={() => this.considerRight()}
            />
            <Button
              color="#f93300"
              title="    Wrong    "
              onPress={() => this.considerWrong()}
            />
          </View>
          <Button
            color="#f9af00"
            title="Restart"
            onPress={() => this.restart()}
          />
        </View>
      );
    }

    //Showing the possible deleatable cards
    if (this.state.deleteCard) {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph2}>
            {' '}
            Which card do you want to delete?
          </Text>
          <ScrollView style={{ height: 250 }}>
            {this.state.cards.map(card => {
              if (card.front != '') {
                return (
                  <View style={styles.container}>
                    <Button
                      color="#f9af00"
                      title={card.front}
                      onPress={() => this.deleteThisCard(card)}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      );
    }

    //Showing the component RenameDeck
    if (this.state.rename) {
      return (
        <View>
          <RenameDeck onSubmit={this.renameDeck} />
        </View>
      );
    }

    //Showing the component AddCard
    if (this.state.add) {
      return (
        <View>
          <AddCard onSubmit={this.addNewCard} />
        </View>
      );
    }

    //Showing a message when the cards from the deck are finished.
    //At this point the user can go back to the homepage or can start again.
    if (this.state.end) {
      return (
        <View>
          <Text style={styles.paragraph}> Finished cards </Text>
          <Button
            color="#f9af00"
            title="Try again"
            onPress={() => this.tryAgain()}
          />
        </View>
      );
    }

    //Deck component, showing all the information regarding a specific chosen deck
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}> {this.state.name} </Text>
        <Button
          color="#f9af00"
          title="Study"
          onPress={() => this.chooseDeck()}
        />
        <Button color="#f9af00" title="Rename" onPress={() => this.rename()} />
        <Button
          color="#f9af00"
          title="Add new card"
          onPress={() => this.addCard()}
        />
        <Button
          color="#f9af00"
          title="Delete card"
          onPress={() => this.deleteCard()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph2: {
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  fixToText: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#fffca8',
  },
});
