import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

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
          <Text>Hi</Text>
          
          <WebView
            source={{uri: 'https://www.google.com'}}
            style={{marginTop: 20, flex: 1, marginLeft: 150, marginRight: 150, flexDirection: 'row', borderColor: 'black'}}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
