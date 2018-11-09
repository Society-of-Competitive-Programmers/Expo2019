/* 
*  Created by Jim Mirzakhalov, October 25, 2018
*   
*  To be able to run the app, run "npm install firebase --save"
*/
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

// firebase configurations for the project
const firebaseConfig = {
  apiKey: "AIzaSyCyAOjCgRO1zjYhbEM-_si8Mgb6WHoCep8",
    authDomain: "scp-dre.firebaseapp.com",
    databaseURL: "https://scp-dre.firebaseio.com",
    projectId: "scp-dre",
    storageBucket: "",
    messagingSenderId: "758043467370"
};

// initializing the firebase instance here
firebase.initializeApp(firebaseConfig);

// Use this variable to make any calls to the database
const database = firebase.database();

export default class Login extends React.Component {
  

  constructor() {
    super();
    this.state = {
      // all the variables used in tnis page can be held here, including variables to hold username, age, school
      // variable for the username, defaults to empty
      username: "",
      // variable for the age, defaults to 0
      age: 0,
      // variable for the school, defaults to empty
      school: "",
    }
  }

  // Firebase Team:
  
  // after firebase is initialized, grab all the usernames from the database and compare them against the "username" given by the user
  // If it already exists, set "username" in the screen to error and say it exists
  // If it doesn't exist, call _registerUser
  _checkIfUsernameExists(){
    //TODO
  }

  // make a json object of the user, and push it to the database. User 'push' instead of 'set'. Then call _navigate to move to the next page
  _registerUser(){
    //TODO
  }

  // DO NOT WRITE ANY CODE IN HERE YET // 
  _navigate(){

  }

  render() {

    return (
      // Login Page Layout Team:
      // put all the layout elements inside this view i.e. all the text input boxes, buttons, all the styles
      //TODO
      <View style={styles.container}>
        <Text> You can do this for sure </Text>
      </View>
      //TODO
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
