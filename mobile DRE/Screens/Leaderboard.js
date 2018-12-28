import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super();
    this.topTen = populateLeaderboard(10);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ marginBottom: 20, marginTop: 20, fontSize: 30 }}> D.R.E. Leaderboard </Text>
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

function populateLeaderboard(numLeaders) {
  let leaderArray = [];
  for(let i = 0; i < numLeaders; i++)
  {
    let user = {
      name: `Player${i}`,
      age: i + 10,
      school: 'USF'
    };
    leaderArray.push(user);
  }
  return leaderArray;
}