import { combineReducers } from 'redux';
import decks from './decks';
import detail from './detail';

export default combineReducers({
  decks: decks,
  deckDetail: detail
});