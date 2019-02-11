import React from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Button,
  Alert,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";
import io from "socket.io-client/dist/socket.io";
import * as firebase from "firebase";

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

export default class App extends React.Component {
  constructor(props) {
    super();
    const me = this;
    
    var maxSaved = 10;
    var startTime = Date.now();
    this.state = {
      direction: 0,
      numSaved: 0,
      score: 0,
      maxSaved: 2,
      startTime: startTime
    }

    this._turn = this._turn.bind(this);
    this.stopTurn = this.stopTurn.bind(this);
    this._move = this._move.bind(this);
    this.stopMove = this.stopMove.bind(this);
    this.saveHuman = this.saveHuman.bind(this);
    this.incrementSaved = this.incrementSaved.bind(this);
    this.navigateToLeaderBoard = this.navigateToLeaderBoard.bind(this);

    this.socket = io("https://dre-2018.herokuapp.com/", {
      jsonp: false
    });

    this.socket.on("connect", function() {
      console.log("Connected to server!");
    });

    this.socket.on('incSaved', function(){
      me.incrementSaved();
    });
    
  }

  state = {
    direction: 0,
    numSaved: 0,
    maxSaved: 0,
    score: 0
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(
      Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    );
  }
  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  _turn(turnDirection) {
    this.socket.emit("turn", turnDirection);
  }

  stopTurn(turnDirection) {
    this.socket.emit("stopTurn", turnDirection);
  }

  _move(moveDirection) {
    this.socket.emit("move", moveDirection);
  }

  stopMove(moveDirection) {
    this.socket.emit("stopMove", moveDirection);
  }

  _navigator() {
    const { navigate } = this.props.navigation;
    navigate("Leaderboard");
  }

  saveHuman() {
    this.socket.emit('save');
  }

  incrementSaved(){
    var newSaved = this.state.numSaved + 1;
    var endTime = Date.now;
    var newScore = this.state.score + (500 - (endTime - this.state.startTime));
    if(newScore < 50)
      newScore = 50;
    if(newSaved == maxSaved){
      this.state.score = this.state.score + newScore;
      navigateToLeaderBoard();
    }
    else {
      this.setState({numSaved: newSaved, startTime: endTime, score: newScore});
    }
  }

  navigateToLeaderBoard(){
    const profile = {
      name: this.props.navigation.getParam('name', 'Bob'),
      age: this.props.navigation.getParam('age', 12),
      school: this.props.navigation.getParam('school', 'USF'),
      score: this.state.score
    };

    database.ref("users/").push(profile);
    this.props.navigation.navigate("Leaderboard")
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: "http://192.168.1.18:8081/" }} // Insert Pi's camera stream link
          style={{
            marginTop: 0,
            flex: 1,
            width: "70%",
            marginTop: 20,
            height: "100%",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}
        />

        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 20,
            left: 10,
            zIndex: 0
          }}
        >
          <TouchableOpacity
            style={{ position: "relative" }}
            onPress={() => this.navigateToLeaderBoard()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>FINISH</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={() => this._move("forward")}
            onPressOut={() => this.stopMove("forward")}
            style={{
              position: "relative",
              marginLeft: 18,
              height: 100,
              width: 100,
              marginTop: 30
            }}
          >
            <Image
              source={require("../assets/Go.png")}
              style={{ height: 87, width: 87 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => this._move("backward")}
            onPressOut={() => this.stopMove("backward")}
            style={{
              position: "relative",
              marginLeft: 18,
              height: 100,
              width: 100,
              marginTop: 0
            }}
          >
            <Image
              source={require("../assets/Stop.png")}
              style={{ height: 87, width: 87 }}
            />
          </TouchableOpacity>
        </View>

        {/* Collection of Buttons on right side of screen */}
        <View style={{ flex: 1, position: "absolute", right: 10, top: 40 }}>
          <TouchableOpacity
            style={{ position: "relative" }}
            onPress={() => this.saveHuman()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Mark</Text>
            </View>
          </TouchableOpacity>
          {/* Left Button */}
          <TouchableOpacity
            onPressIn={() => this._turn("left")}
            onPressOut={() => this.stopTurn("left")}
            style={{ position: "relative", height: 100, width: 100 }}
          >
            <Image
              source={require("../assets/if_left_arrow_476327.png")}
              style={{ height: 100, width: 100 }}
            />
          </TouchableOpacity>

          {/* Right Button */}
          <TouchableOpacity
            onPressIn={() => this._turn("right")}
            onPressOut={() => this.stopTurn("right")}
            style={{
              position: "relative",
              height: 100,
              width: 100,
              marginTop: 0
            }}
          >
            <Image
              source={require("../assets/right_arrow-512.png")}
              style={{ height: 100, width: 100 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23604E",
    flexDirection: "row",
    height: 5
  },
  button: {
    padding: 12,
    borderWidth: 1,
    backgroundColor: "#18CD12",
    borderColor: "#18CD12",
    borderRadius: 10,
    height: 50,
    width: 100,
    alignItems: "center",
    zIndex: 0
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    zIndex: 0
  }
});
