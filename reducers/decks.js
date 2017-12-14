import {
  FETCH_DECKS,
  SAVE_DECK,
  DELETE_DECK
} from '../actions/constants';

const INITIAL_STATE = {
    //[{ key: "deck", title: "deck", questions: [] }]
};

export default (state = INITIAL_STATE, action) => {
  console.log('action.type:',action.type);
  console.log('state:',state);
  
  switch (action.type) {
    
    case FETCH_DECKS:
      return action.payload;
    
    case SAVE_DECK:
      return [...state,{
        key: action.payload,
        title: action.payload,
        questions: []
      }];

    case DELETE_DECK:
      return action.payload;
    
    default:
      return state;
  }
};