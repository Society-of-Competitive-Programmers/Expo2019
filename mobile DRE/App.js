/* 
*  Created by Jim Mirzakhalov, October 25, 2018
*   
*  To be able to run the app, run "npm install firebase --save"
*/
import React from 'react';
import { View, StyleSheet, StackNavigator} from 'react-native';
import Login from './Screens/Login.js'
import Stream from './Screens/Stream.js'
import Leaderboard from './Screens/Leaderboard.js'
import {createSwitchNavigator} from 'react-navigation'


const AppNavigator = createSwitchNavigator({
 
  "Login": Login,
  "Stream": Stream,
  "Leaderboard" : Leaderboard
  
});


export default class App extends React.Component {
  
  render() {

    return (
      
      <View style={styles.container}>
            <AppNavigator/>
      </View>
    
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

/*Hides a timer bug from emulator in development. Related to android.
 *
 * https://github.com/facebook/react-native/issues/12981
 * */
console.ignoredYellowBox = [
  'Setting a timer'
];