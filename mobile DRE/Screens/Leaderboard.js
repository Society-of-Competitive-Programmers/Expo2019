import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import * as firebase from "firebase";

const database = firebase.database();

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widthArr: [1, 3, 1, 3, 2], //width of columns
      tableHead: ["", "Name", "Age", "School", "Score"],
      topPlayers: [],
      tableData: []
    };

    this.onUserData = this.onUserData.bind(this);
  }

  // Receives user data, sorts it, and populates table state
  onUserData(users) {
    let leaderArray = [];

    users.forEach(usersChild => {
      let player = usersChild.val(); // player object
      leaderArray.push(player);
    });
    let playerArray = populateLeaderboard(leaderArray);
    let dataArray = populateTableData(playerArray);

    this.setState({
      topPlayers: playerArray,
      tableData: dataArray
    });
  }

  componentDidMount() {
    const usersRef = database.ref("users/").orderByChild("score");
    usersRef.on("value", this.onUserData);

    Expo.ScreenOrientation.allow(
      Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
  }

  render() {
    const state = this.state;
    // rankElement is yellow circle that displays rank
    const rankElement = data => (
      <View style={styles.rank}>
        <Text style={styles.text}>{data}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>D.R.E. Leaderboard</Text>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={false}
          >
            <Table
              style={styles.table}
              borderStyle={{ borderColor: "transparent" }} // removes table lines
            >
              <Row
                data={state.tableHead}
                flexArr={state.widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
              {/*create table wrapper for each row */}
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={cellIndex === 0 ? rankElement(cellData) : cellData} //creates circle element if first cell
                      style={[
                        {
                          width: state.widthArr[cellIndex] * 40, //cell width approx. proportional to widthArr
                          height: 30
                        },
                        index % 2 && { backgroundColor: "#F7F6E7" } //varies color of cell depending on which row its in
                      ]}
                      textStyle={styles.tableText}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>
        </ScrollView>
        <View style={{ width: 380, alignSelf: "center" }}>
          <Button
            onPress={() => this.props.navigation.navigate("Login")}
            title="Back to Login Screen"
            color="#18CD12"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#23604E",
    width: "100%"
  },
  header: {
    fontSize: 20,
    padding: 10,
    paddingTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  table: { width: 400 },
  head: { height: 40, backgroundColor: "#000" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#ECD459" },
  row: { height: 28, backgroundColor: "#E7E6E1", flexDirection: "row" },
  text: { textAlign: "center", color: "#fff" },
  tableText: { textAlign: "center", color: "#000" },
  rank: {
    borderRadius: 50,
    backgroundColor: "#ECD459",
    width: 30,
    alignSelf: "center"
  }
});

//sorts players by determined property and returns the desired number of results
function populateLeaderboard(leaderArray) {
  //filter out empty name fields
  leaderArray = leaderArray.filter(player => player.name !== "");
  //sort array by score
  leaderArray.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
  //return only desired top number of players
  return leaderArray;
}

// populates table data with player info
function populateTableData(topPlayers) {
  let tableData = [];
  let i = 1;
  topPlayers.forEach(player => {
    let rowData = [];
    rowData.push(i++); // player leaderboard position
    rowData.push(player.name);
    rowData.push(player.age);
    rowData.push(player.school);
    rowData.push(player.score);
    tableData.push(rowData);
  });
  return tableData;
}
