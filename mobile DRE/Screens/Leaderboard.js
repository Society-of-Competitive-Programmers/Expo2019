import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';
import * as firebase from 'firebase';

const database = firebase.database();

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.numLeaders =  0;
    
    this.state = {
      
      tableHead: [[''], ['Name'], ['Age'], ['School'], ['Score']],
      tableData: [],
      // tableTitle: [],
      // topPlayers: [],
      // tableData: [],
    };

    this.onUserData = this.onUserData.bind(this);
  }

  // Receives user data, sorts it, and populates table state
  onUserData(users) {
    let data = [[], [], [], [], []];
    let tableTitle1 = [];

    let leaderArray = [];
    users.forEach((usersChild) => {
      let player = usersChild.val();
      leaderArray.push(player);
    });
    this.numLeaders = users.length;
    let playerArray = populateLeaderboard(leaderArray, users.length);
    //let dataArray = populateTableData(playerArray);

    let i = 1;
    playerArray.forEach((player) => {
      data[0].push(i++);
      data[1].push(player.name);
      data[2].push(player.age);
      data[3].push(player.school);
      data[4].push(player.score);
    });


    this.setState({
      tableData: data
    });    
  }

  componentDidMount() {  
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
              {/* <Cols data={state.tableHead}  textStyle={styles.text}/> */}
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableHead[0]}  style={styles.head} textStyle={styles.text}/>
                {/* <Col data={state.tableData[0]}  style={styles.title} textStyle={styles.text}/> */}
              </TableWrapper>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableHead[1]}  style={styles.head} textStyle={styles.text}/>
                {/* <Col data={state.tableData[1]}  style={styles.row} textStyle={styles.text}/> */}
              </TableWrapper>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableHead[2]}  style={styles.head} textStyle={styles.text}/>
                {/* <Col data={state.tableData[2]}  style={styles.row} textStyle={styles.text}/> */}
              </TableWrapper>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableHead[3]}  style={styles.head} textStyle={styles.text}/>
                {/* <Col data={state.tableData[3]}  style={styles.row} textStyle={styles.text}/> */}
              </TableWrapper>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableHead[4]}  style={styles.head} textStyle={styles.text}/>
                {/* <Col data={state.tableData[4]}  style={styles.row} textStyle={styles.text}/> */}
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
  table: { flexDirection: 'row', minWidth: 400},
  head: { backgroundColor: '#f1f8ff', flex: 1, height: 28 },
  wrapper: { flex: 1 },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {flex: 1},
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
  let tableData = [[],[],[],[]];

  topPlayers.forEach((player) => {
    tableData[0].push(player.name);
    tableData[1].push(player.age);
    tableData[2].push(player.school);
    tableData[3].push(player.score);
  });


  return tableData;
}