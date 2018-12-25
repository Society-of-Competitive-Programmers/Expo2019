import React from 'react';
import { StyleSheet, Text, View, WebView, Button, Alert, Animated, Image, TouchableOpacity } from 'react-native';

export default class App extends React.Component {


  constructor(props){
    super();
    this.state = {
      direction: 0
    }

    this.timer = null;
    this._decrementDirection = this._decrementDirection.bind(this);
    this._incrementDirection = this._incrementDirection.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
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

  _incrementDirection(){
    this.setState(prevState => ({direction: prevState.direction + 1}));
    this.timer = setTimeout(this._incrementDirection, 100);
  }

  _decrementDirection(){
    this.setState(prevState => ({direction: prevState.direction - 1}));
    this.timer = setTimeout(this._decrementDirection, 100);
  }

  stopTimer(){
    clearTimeout(this.timer);
  }

  _navigator(){

  }

  render() {
    return (
        <View style={styles.container}>
          
          <Text style={{textAlign:'left', marginTop: 20, marginRight: 20, zIndex: -1, flexDirection:'row', position: 'absolute', right: 10}}>{this.state.direction}</Text>

          {/* <View style={{position: 'absolute', flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{position:'relative'}}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>    
                </View> 
            </TouchableOpacity>
          </View> */}
          
          
          
          {/* WebView */}
          <WebView
            source={{uri: 'https://www.google.com'}}
            style={{marginTop: 0, flex: 1, width:'70%', marginTop: 20, height: '100%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}
          />

          <View style={{flex: 1, position: 'absolute', top: 10, left: 10, zIndex: 0}}>
            <TouchableOpacity style={{position:'relative'}} onPress={() => _navigator()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>    
                </View> 
            </TouchableOpacity>

            <TouchableOpacity  style={{position: 'relative', marginLeft: 12, height:75, width: 75, marginTop: 50}}>
              <Image 
                source={require("../assets/upload_icon.png")}
                style={{height:75, width: 75}}
              />
            </TouchableOpacity>
            <TouchableOpacity  style={{position: 'relative', height:100, width: 100, marginTop: 0}}>
              <Image 
                source={require("../assets/032_-_menu-512.png")}
                style={{height:100, width: 100}}
              />
            </TouchableOpacity>
          </View>

          
          {/* Collection of Buttons on right side of screen */}
          <View style={{flex: 1, position: 'absolute', right: 10, top: 70}}>
            {/* Left Button */}
            <TouchableOpacity onPressIn={this._decrementDirection} onPressOut={this.stopTimer} style={{position: 'relative', height:100, width: 100}}>
              <Image 
                source={require("../assets/if_left_arrow_476327.png")}
                style={{height:100, width: 100}}
              />
            </TouchableOpacity>
            
            {/* Right Button */}
            <TouchableOpacity onPressIn={this._incrementDirection} onPressOut={this.stopTimer} style={{position: 'relative', height:100, width: 100, marginTop: 10}}>
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
