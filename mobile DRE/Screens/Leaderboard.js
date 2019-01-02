import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as firebase from 'firebase';

const database = firebase.database();

const usersRef = database.ref('users/');


export default class Leaderboard extends React.Component {
  

  constructor(props) {
    super(props);
    this.numLeaders = 10;
    this.topPlayers = [];
    this.state = {
      tableHead: ['', 'Name', 'Age', 'School', 'Points'],
      tableTitle: (function (numLeaders) {
        const leaders = [];
        for (let i = 1; i < numLeaders + 1; i++) {
          leaders.push(i);
        }
        return leaders;
      }(this.numLeaders)),   
      tableData: this.populateTableData()
    };
  }

  

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
  }
  
  populateTableData(){
    let tableData = [];
    this.topPlayers.forEach((player) => {
      let rowData = [];
      rowData.push(player.name);
      rowData.push(player.age);
      rowData.push(player.school);
      rowData.push(player.score);
      tableData.push(rowData);
    });
    return tableData;
  }


  render() {
    const state = this.state;    

    usersRef.on('value', function (snapshot) {
      let leaderArray = [];
      snapshot.forEach(function (childSnapshot) {
        let player = childSnapshot.val();
        leaderArray.push(player);
      });
      this.topPlayers = populateLeaderboard(leaderArray, this.numLeaders);
    });

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

//currently generates dummy users
function populateLeaderboard(leaderArray, numLeaders) {
  

  

  //sort array by name
  leaderArray.sort((a, b) => {return b.name - a.name});

  leaderArray.slice(0, numLeaders - 1);
  return leaderArray;
}