import { AsyncStorage } from 'react-native';
import { getDecks, getDeck, addDeck } from '../utils/api';

import {
  FETCH_DECKS,
  FETCH_SINGLE_DECK,
  SAVE_DECK,
  DELETE_DECK
} from './constants';

export function saveDeck(title) {
  return (dispatch) => {
    addDeck(title)
      .then(data => {
        dispatch({
          type: SAVE_DECK,
          payload: title,
        })
      })
      .catch(err => console.log(err));
  }
}

export function deleteDeck(removeTitle) {
  return (dispatch) => {
    AsyncStorage.removeItem(removeTitle)
      .then(
        getDecks().then(data => {
          dispatch({
            type: DELETE_DECK,
            payload: data
          })
        })
        .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  }
}

export function fetchDecks() {
  return (dispatch) => {
    getDecks()
      .then(data =>
        dispatch({
          type: FETCH_DECKS,
          payload: data
        })
      );
  }
}

export function getDeckDetails(entryId) {
  return (dispatch) => {
    getDeck(entryId)
      .then(cardDeck => {
        dispatch({
          type: FETCH_SINGLE_DECK,
          payload: JSON.parse(cardDeck)
        })
      });
  }
}