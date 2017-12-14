import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Badge, Card } from 'react-native-elements';
import { fetchDecks } from '../actions';

class ListDeck extends Component {

  componentDidMount() {
    this.props.fetchDecks();
  }

/*   goToDetailDeck = (item) => {
    this.props.navigation.navigate(
      'DetailDeck',
      {
        entryId: item.key,
        navTitle: item.title
      }
    );    
  } */

  renderDeck = ({ item }) => {
    return (
       <TouchableOpacity
        onPress={
          //this.goToDetailDeck(item) //must be a pure function
          () => this.props.navigation.navigate(
            'DetailDeck',
            {
              entryId: item.key,
              navTitle: item.title
            }
          )
        }
      >
        <View>
          <Card
            title={item.title}
            subtitle={`${item.questions.length} cards`}
          >
            <Badge
              containerStyle={{ backgroundColor: 'lightblue'}}
            >
              <Text>
                {`${item.questions.length} cards`}
              </Text>
            </Badge>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.decks.length > 0
          ?
          <FlatList
            data={this.props.decks}
            renderItem={this.renderDeck}
          />
          : 
          <Card title="Create your first deck!"/>
        }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
};

const mapStateToProps = state => {
  const decks = state.decks;
  console.log('state.decks:',decks);

  return { decks };
};

export default connect(mapStateToProps, { fetchDecks })(ListDeck);

