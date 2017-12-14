import {
  FETCH_SINGLE_DECK
} from '../actions/constants';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case FETCH_SINGLE_DECK:
      return action.payload;
    
    default:
      return state;
  }
};