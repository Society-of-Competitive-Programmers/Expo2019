/* 
*  Created by Jim Mirzakhalov, October 25, 2018
*   
*  To be able to run the app, run "npm install firebase --save"
*/
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView} from 'react-native';
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

      name: "",

      age: "",

      school: "",
    }

    this._navigate.bind(this);

  }

  // Firebase Team:
  
  // make a json object of the user, and push it to the database. User 'push' instead of 'set'. Then call _navigate to move to the next page
  _registerUser(){
   
    const profile = {
      name: this.state.name,
      age: this.state.age,
      school: this.state.school,
    }
    
    if(profile.name == "" || profile.age == "" || profile.school == ""){
        alert("All fields must be filled in");
    }

   database.ref("users/").push(profile);
   this._navigate();

  }

  // DO NOT WRITE ANY CODE IN HERE YET // 
  _navigate(){
   
    const { navigate } = this.props.navigation;
    navigate("Stream");
  }
  
  render() {

    return (
      // Login Page Layout Team:
      // put all the layout elements inside this view i.e. all the text input boxes, buttons, all the styles
      //TODO
      <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding">
        <Image
          source={{
            uri: 'https://facebook.github.io/react/logo-og.png',
            // cache: 'only-if-cached',
          }}
          style={{width: 200, height: 200}}
        />
        <Text
         style = {{marginBottom: 20, marginTop: 20,  fontSize: 30}}> D.R.E. </Text>
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', backgroundColor: '#D3D3D3', borderWidth: 1, marginBottom: 10, paddingLeft: 5}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder = {"Name"}
          placeholderTextColor = "black"
          windowSoftInputMode = "adjustResize"
        />
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', backgroundColor: '#D3D3D3',  borderWidth: 1, marginBottom: 10, paddingLeft: 5}}
          onChangeText={(age) => this.setState({age})}
          value={this.state.age}
          placeholder = {"Age"}
          placeholderTextColor = "black"
          windowSoftInputMode = "adjustResize"
        />
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', backgroundColor: '#D3D3D3', borderWidth: 1, marginBottom: 20, paddingLeft: 5}}
          onChangeText={(school) => this.setState({school})}
          value={this.state.school}
          placeholder = {"School"}
          placeholderTextColor = "black"
          windowSoftInputMode = "adjustResize"
        />

        <Button
          onPress={this._registerUser.bind(this)/*this._registerUser()*/}
          title="Let's Get Started!!!"
          color="#0066ff"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Leaderboard')}
          title="Leaderboard"
          color="#ff0000"
        />
      </KeyboardAvoidingView>
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