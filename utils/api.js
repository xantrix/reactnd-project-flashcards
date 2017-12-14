import { AsyncStorage } from 'react-native';

AsyncStorage.clear();
//addDeck('init deck');
dumpKeys();

export function dumpKeys() {
  console.log('api/dumpKeys');
  AsyncStorage.getAllKeys().then(
    keys => {
      console.log(keys);
    }
  )
}

export function getDecks() {
  console.log('api/getDecks');
  return AsyncStorage.getAllKeys().then(keys => {
    return AsyncStorage.multiGet(keys).then(stores => {
      return stores.map((result, i, store) => {
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        if (value) {
          return {
            key,
            title: value.title,
            questions: value.questions
          };
        }
      }).filter(items => {
        if (items) {
          return typeof items.questions !== 'undefined'
        }
      });
    });
  });
}

export function getDeck(id) {
  console.log('api/getDeck');
  return AsyncStorage.getItem(id);
}

export function addDeck(title) {
  console.log('api/addDeck');
  return AsyncStorage.setItem(
    title, 
    JSON.stringify({ title, questions: [] })
  );
}

export function addCardToDeck(title, card) {
  // console.log("add card", title, card.question, card.answer);
  
  try {
    AsyncStorage.getItem(title).then(result => {
      const data = JSON.parse(result);

      let questions = data.questions;
      questions.push(card);

      AsyncStorage.mergeItem(title, JSON.stringify({
        questions
      }));
    });
  } catch (error) {
    console.log(error);
  }
  return "thanks"
}