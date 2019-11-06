import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: props.key,
      front: props.front,
      back: props.back,
      switching: true,
      currentSide: props.front,
    };
  }

  switch() {
    this.setState(prev => ({ switching: !prev.switching }));

    if (this.state.switching) {
      this.setState({ currentSide: this.state.back });
    } else {
      this.setState({ currentSide: this.state.front });
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.card}>{this.state.currentSide}</Text>
        <Button color='#f9af00' title="Cover" onPress={() => this.switch()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});
