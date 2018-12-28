import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super();
    this.topTen = populateLeaderboard(10);
  }

  renderRow() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>Test</View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ marginBottom: 20, marginTop: 20, fontSize: 30 }}> D.R.E. Leaderboard </Text>
      </View>
      <View 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          this.state.topTen.map((user) => { // This will render a row for each user
            return this.renderRow();
          })
        }
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

//currently generates dummy users
function populateLeaderboard(numLeaders) {
  let leaderArray = [];
  for(let i = 0; i < numLeaders; i++)
  {
    let user = {
      name: `Player${i}`,
      age: i + 10,
      school: 'USF',
      score: i * 3
    };
    leaderArray.push(user);
  }
  leaderArray.sort((a, b) => {return b.score - a.score});
  return leaderArray;
}