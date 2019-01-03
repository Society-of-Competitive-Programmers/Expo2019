import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import * as firebase from 'firebase';

const database = firebase.database();

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.numLeaders = 10;
    
    this.state = {
      tableHead: ['', 'Name', 'Age', 'School', 'Time'],
      tableTitle: (function (numLeaders) {
        const leaders = [];
        for (let i = 1; i < numLeaders + 1; i++) {
          leaders.push(i);
        }
        return leaders;
      }(this.numLeaders)), 
      topPlayers: [],
      tableData: [],
    };

    this.onUserData = this.onUserData.bind(this);
  }

  // Receives user data, sorts it, and populates table state
  onUserData(users) {
    let leaderArray = [];
    users.forEach((usersChild) => {
      let player = usersChild.val();
      leaderArray.push(player);
    });
    let playerArray = populateLeaderboard(leaderArray, this.numLeaders);
    let dataArray = populateTableData(playerArray);

    this.setState({
      topPlayers: playerArray,
      tableData: dataArray
    });    
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    
    const usersRef = database.ref('users/');
    usersRef.on('value', this.onUserData);
 
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
  }
  
  render() {
    const state = this.state;    
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>D.R.E. Leaderboard</Text>
        <ScrollView style={{width: "100%"}} showsVerticalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  directionalLockEnabled={false}>
            <Table style={styles.table}>
              <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text}/>
                <Rows data={state.tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
              </TableWrapper>
            </Table> 
          </ScrollView>
          
        </ScrollView>

        <Button
            onPress={() => this.props.navigation.navigate('Login')}
            title="Back to Login Screen"
            color="#ff0000"
          />
      </View>          
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: {fontSize: 20, padding: 10, paddingTop: 30, textAlign: 'center', fontWeight: 'bold'},
  table: {width: 400},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }
});


//sorts players by determined property and returns the desired number of results
function populateLeaderboard(leaderArray, numLeaders) {
  
  //filter out empty name fields
  leaderArray = leaderArray.filter(player => player.name !== "");
  //sort array by name
  leaderArray.sort((a, b) => {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  });
  //return only desired top number of players
  return leaderArray.slice(0, numLeaders);
}

// populates table data with player info
function populateTableData(topPlayers) {
  let tableData = [];
  topPlayers.forEach((player) => {
    let rowData = [];
    rowData.push(player.name);
    rowData.push(player.age);
    rowData.push(player.school);
    rowData.push(player.score);
    tableData.push(rowData);
  });
  return tableData;
}