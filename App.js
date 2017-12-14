import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import HomeDeck from './components/HomeDeck';
import AddDeck from './components/AddDeck';
import DetailDeck from './components/DetailDeck';
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers';

const Tabs = TabNavigator({
  Decks: {
    screen: HomeDeck,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
});

const MainNavigator =  StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "Flash Cards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "black"

      }
    }
  },
  DetailDeck: {
    screen: DetailDeck,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  /*AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  }*/
});

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="blue"
            barStyle="dark-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
