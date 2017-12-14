import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, Card, FormInput, FormValidationMessage } from 'react-native-elements';
import { saveDeck } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  
  state = {
    titleText: '',
    errorMessage: false
  };

  handleSubmit = () => {
    if (this.state.titleText) {
      const { titleText } = this.state;
      
      this.props.saveDeck(titleText);

      this.setState({
        errorMessage: false,
        titleText: ''
      });

      this.props.navigation.navigate(
        'DetailDeck',
        {
          entryId: titleText,
          navTitle: titleText
        },
        Keyboard.dismiss()
      );

    } else {
      this.setState({ 
        errorMessage: true 
      })
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{
        flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="What is the title of your new deck?" >
          <FormInput
            onChangeText={titleText => this.setState({ titleText })}
            value={this.state.titleText}
          />
          
          <FormValidationMessage>
            {this.state.errorMessage ? 'This field is required': ''}
          </FormValidationMessage>
          
          <Button
            title="Create Deck"
            raised
            backgroundColor="rgb(42, 133, 237)"
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps, { saveDeck }
)(AddDeck);