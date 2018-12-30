import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Leaderboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.numLeaders = 10;
    this.topPlayers = populateLeaderboard(this.numLeaders);
    this.state = {
      tableHead: ['', 'Name', 'Age', 'School', 'Points'],
      tableTitle: [...Array(this.numLeaders).keys()],   
      tableData: this.populateTableData()
    };
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

    return (
      <View style={styles.container}>
        <Text style={styles.header}>D.R.E. Leaderboard</Text>
        <Table style={styles.table}>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table> 
      </View>          
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: {fontSize: 20},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }
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