/*
 *  Created by Jim Mirzakhalov, October 25, 2018
 *
 *  To be able to run the app, run "npm install firebase --save"
 */
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import *  as firebase from "firebase";

// // firebase configurations for the project
// const firebaseConfig = {
//   apiKey: "AIzaSyCyAOjCgRO1zjYhbEM-_si8Mgb6WHoCep8",
//   authDomain: "scp-dre.firebaseapp.com",
//   databaseURL: "https://scp-dre.firebaseio.com",
//   projectId: "scp-dre",
//   storageBucket: "",
//   messagingSenderId: "758043467370"
// };

// // initializing the firebase instance here
// firebase.initializeApp(firebaseConfig);

// // Use this variable to make any calls to the database
// const database = firebase.database();

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

      school: ""
    };

    this._navigate.bind(this);
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(
      Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
  }

  // Firebase Team:

  // make a json object of the user, and push it to the database. User 'push' instead of 'set'. Then call _navigate to move to the next page
  _registerUser() {
    const profile = {
      name: this.state.name,
      age: this.state.age,
      school: this.state.school
    };

    if (profile.name == "" || profile.age == "" || profile.school == "") {
      alert("All fields must be filled in");
    } else {
      //database.ref("users/").push(profile);
      this.props.navigation.navigate("Stream", {
        name: this.state.name,
        age: this.state.age,
        school: this.state.school
      });
    }
  }

  // DO NOT WRITE ANY CODE IN HERE YET //
  _navigate() {
    const { navigate } = this.props.navigation;
    navigate("Stream");
  }

  render() {
    return (
      // Login Page Layout Team:
      // put all the layout elements inside this view i.e. all the text input boxes, buttons, all the styles
      //TODO
      <ScrollView
        style={{
          width: "100%",
          backgroundColor: "#23604E"
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            marginTop: 15,
            fontSize: 30,
            paddingTop: 50,
            color: "#fff"
          }}
        >
          D.R.E.
        </Text>
        
        <KeyboardAwareScrollView
          style={{ paddingTop: 50 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          animated={true}
        >
          <Image
            source={require("../assets/loginLogo.png")}
            style={styles.loginImage}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder={"Name"}
            placeholderTextColor="#fff"
            windowSoftInputMode="adjustResize"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={age => this.setState({ age })}
            value={this.state.age}
            placeholder={"Age"}
            placeholderTextColor="#fff"
            windowSoftInputMode="adjustResize"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={school => this.setState({ school })}
            value={this.state.school}
            placeholder={"School"}
            placeholderTextColor="#fff"
            windowSoftInputMode="adjustResize"
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={styles.startButton}
            onPress={this._registerUser.bind(this) /*this._registerUser()*/}
          >
            <Text style={styles.btnText}>START</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <TouchableHighlight
          style={{ marginTop: 30 }}
          onPress={() => this.props.navigation.navigate("Leaderboard")}
        >
          <Text style={{ color: "#ECD459", fontSize: 25 }}>Leaderboard</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: 350,
    borderRadius: 10,
    paddingTop: 100
  },
  loginImage: {
    height: 200,
    width: 200,
    zIndex: 100,
    position: "absolute",
    top: -60
  },
  textInput: {
    height: 50,
    width: 250,
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: "#23604E",
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20
  },
  startButton: {
    width: 250,
    height: 80,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#18CD12",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontSize: 30,
    color: "#fff"
  }
});
