import React from 'react';
import { StyleSheet, Text, View, WebView, Button, Alert, Animated, Image, TouchableOpacity } from 'react-native';
import io from "socket.io-client/dist/socket.io";

export default class App extends React.Component {


  constructor(props){
    super();
    this.state = {
      direction: 0
    }

    this._turn = this._turn.bind(this);
    this.stopTurn = this.stopTurn.bind(this);
    this._move = this._move.bind(this);
    this.stopMove = this.stopMove.bind(this);   

    this.socket = io('https://sleepy-everglades-29815.herokuapp.com/', {jsonp: false});
    this.socket.on('connect', function(){
      console.log('Connected to server!');
    });
  }

  state = {
    direction: 0
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }
  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  _turn(turnDirection){
    this.socket.emit('turn', turnDirection);
  }

  stopTurn(turnDirection){
    this.socket.emit('stopTurn', turnDirection);
  }

  _move(moveDirection){
    this.socket.emit('move', moveDirection);
  }

  stopMove(moveDirection){
    this.socket.emit('stopMove', moveDirection);
  }

  _navigator(){
    const { navigate } = this.props.navigation;
    navigate("Leaderboard");
  }

  render() {
    return (
        <View style={styles.container}>
          
          {/* <Text style={{textAlign:'left', marginTop: 20, marginRight: 20, zIndex: -1, flexDirection:'row', position: 'absolute', right: 10}}>{this.state.direction}</Text> */}

          {/* <View style={{position: 'absolute', flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{position:'relative'}}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>    
                </View> 
            </TouchableOpacity>
          </View> */}
          
          
          
          {/* WebView */}
          <WebView
            source={{uri: 'https://sleepy-everglades-29815.herokuapp.com/'}} // Insert Pi's camera stream link
            style={{marginTop: 0, flex: 1, width:'70%', marginTop: 20, height: '100%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}
          />

          <View style={{flex: 1, position: 'absolute', top: 20, left: 10, zIndex: 0}}>
            <TouchableOpacity style={{position:'relative'}} onPress={() => this.props.navigation.navigate('Leaderboard')}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>    
                </View> 
            </TouchableOpacity>

            <TouchableOpacity onPressIn={() => this._move('forward')} onPressOut={() => this.stopMove('forward')} style={{position: 'relative', marginLeft: 18, height: 100, width: 100, marginTop: 30}}>
              <Image 
                source={require("../assets/Go.png")}
                style={{height:87, width: 87}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => this._move('backward')} onPressOut={() => this.stopMove('backward')} style={{position: 'relative', marginLeft: 18, height: 100, width: 100, marginTop: 0}}>
              <Image 
                source={require("../assets/Stop.png")}
                style={{height:87, width: 87}}
              />
            </TouchableOpacity>
          </View>

          
          {/* Collection of Buttons on right side of screen */}
          <View style={{flex: 1, position: 'absolute', right: 10, top: 80}}>
            {/* Left Button */}
            <TouchableOpacity onPressIn={() => this._turn('left')} onPressOut={() => this.stopTurn('left')} style={{position: 'relative', height:100, width: 100}}>
              <Image 
                source={require("../assets/if_left_arrow_476327.png")}
                style={{height:100, width: 100}}
              />
            </TouchableOpacity>
            
            {/* Right Button */}
            <TouchableOpacity onPressIn={() => this._turn('right')} onPressOut={() => this.stopTurn('right')} style={{position: 'relative', height:100, width: 100, marginTop: 0}}>
              <Image 
                source={require("../assets/right_arrow-512.png")}
                style={{height:100, width: 100}}
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 5,
  },
  button: {
    padding: 12,
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
    borderRadius: 10,
    height: 50,
    width: 100,
    alignItems: 'center',
    zIndex: 0
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 0
  },
});
