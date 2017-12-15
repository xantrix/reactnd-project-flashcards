import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Badge, Button, Card } from 'react-native-elements';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
  
  state = {
    showQuestion: true,
    questions: this.shuffleQuestions(),
    currentQuestion: 0, //index of current question
    correctAnswers: 0 //counter of correct answers
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  resetNotification() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  resetQuiz() {
    this.setState(() => {
      return {
        showQuestion: true,
        questions: this.shuffleQuestions(),
        currentQuestion: 0,
        correctAnswers: 0
      }
    });
    this.resetNotification()
  }

  backToDeck() {
    this.resetQuiz();
    this.resetNotification();
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  shuffleQuestions() {
    const questions = this.props.navigation.state.params.questions;
    let i = questions.length-1;

    //shuffle question with a random one for each iteration
    do {
      const randomIndex = Math.floor(Math.random()*(questions.length-1));
      const swapEl = questions[randomIndex];
      questions[randomIndex] = questions[i];
      questions[i] = swapEl;
      i--;
    } while (i >= 0);

    return questions;
  }

  renderCard() {
    const { questions, currentQuestion, correctAnswers } = this.state;

    //still questions to show ?
    if (currentQuestion < questions.length) {
      return (
        <Card
          title={
            this.state.showQuestion
              ? `Question: ${questions[currentQuestion].question}`
              : `Answer: ${questions[currentQuestion].answer}`
          }
        >
          <View>
            <Text style={styles.questionsRemaining}>
              {`Question ${currentQuestion+1} of ${questions.length}`}
            </Text>
          </View>
          
          <View style={styles.badgeStyle}>
            <Badge
              containerStyle={{ backgroundColor: 'violet'}}
              onPress={() => 
                this.setState({ 
                  showQuestion: !this.state.showQuestion 
                })}
            >
              <Text>
                {this.state.showQuestion ? "Show the Answer" : "Show the Question"}
              </Text>
            </Badge>
          </View>
          
          <Button
            buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
            title="Correct"
            backgroundColor='#377D22'
            onPress={() => {
              this.setState({
                currentQuestion: currentQuestion+1,
                correctAnswers: correctAnswers+1
              });
            }}
          />
          
          <Button
            buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
            title="Incorrect"
            backgroundColor='#C3392A'
            onPress={() => this.setState({ 
              currentQuestion: currentQuestion+1 
            })}
          />
        </Card>
      );
    }
    
    //show quiz result
    return (
      <Card
        title={`You got ${correctAnswers} correct answers out of ${questions.length}`}
      >
        <Button
          buttonStyle={styles.buttonStyle}
          title="Start again"
          backgroundColor='#377D22'
          onPress={() => this.resetQuiz()}
        />
        <Button
          buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
          title="Back to Deck"
          backgroundColor='#C3392A'
          onPress={() => this.backToDeck()}
        />
      </Card>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        {this.renderCard()}
      </View>
    );
  }
}

const styles = {
  badgeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10
  },  
  buttonStyle: {
    borderRadius: 50,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  questionsRemaining: {
    textAlign: 'center',
    marginBottom: 10
  },
};

export default Quiz;
