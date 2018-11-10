import React from 'react';
import { StyleSheet, Text, View, WebView, Button, Alert } from 'react-native';

export default class App extends React.Component {
  componentDidMount() {
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }
  componentWillUnmount() {
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={{textAlign:'left', marginTop: 20, marginLeft: 20, zIndex: -1, flexDirection:'row'}}>Hi</Text>
            <WebView
              source={{uri: 'https://www.google.com'}}
              style={{marginTop: 20, flex: 1, width:'70%', height: '100%', flexDirection: 'row', borderColor: 'black', justifyContent: 'center', alignSelf: 'center'}}
            />
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
});
