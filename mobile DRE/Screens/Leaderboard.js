import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super();
    this.topTen = populateLeaderboard(10);
  }

  renderRow(player) {
    return (
      <View style={styles.row} key={player.name}>
        <View style={styles.cell} key={`${player.name}1`}><Text>{player.name}</Text></View>
        <View style={styles.cell} key={`${player.name}2`}><Text>{player.age}</Text></View>
        <View style={styles.cell} key={`${player.name}3`}><Text>{player.school}</Text></View>
        <View style={styles.cell} key={`${player.name}4`}><Text>{player.score}</Text></View>
      </View>
    );
  }

  

  render() {
    

    return (
      <View style={styles.container}>
        <Text style={styles.header}>D.R.E. Leaderboard</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}><Text>Name</Text></View>
            <View style={styles.cell}><Text>Age</Text></View>
            <View style={styles.cell}><Text>School</Text></View>
            <View style={styles.cell}><Text>Points</Text></View>
          </View>
          {
            this.topTen.map((datum) => { // This will render a row for each data element.
              return this.renderRow(datum);
            })
          }
        </View> 
      </View>          
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "90%",
    width: "90%",
    top: "5%"
  },
  header: {
    fontSize: 20
  },
  table: {
    flex: 1,
    height: "80%",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch'
  }
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