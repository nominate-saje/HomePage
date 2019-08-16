
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import EventList from './components/EventList.js/index.js';

const { height, width } = Dimensions.get('window');
const apiUrl = "ENTER_API_URL" // CHANGE
const loggedInUser; // TODO
const loggedInUserName; // CHANGE


// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
    backgroundColor: "rebeccapurple"
  },
  headingText: {
    color: "white",
    fontFamily: "Menlo",
    fontSize: 50
  },
  body: {
    backgroundColor: "#ac40ff",
    flex: 10,
    justifyContent: 'flex-start'
  },
  eventList: {
    fontFamily: "Menlo",
    color: "white",
    fontSize: 20,
    alignSelf: 'center',
    margin: 10
  },
  loading: {
    color: "#4e1487",
    fontFamily: "Menlo",
    fontSize: 25
  },
  joinContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#b34fff"
  },
  input: {
    flex: 7,
    backgroundColor: "#b34fff",
    padding: 10,
    margin: 10
  },
  join: {
    flex: 3,
    backgroundColor: "#b34fff",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    borderColor: "rebeccapurple",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 5
  },
  joinText: {
    color: "white",
    fontFamily: "Menlo",
    fontSize: 13
  },
  wrapper: {
    borderBottomWidth: 1,
    borderColor: "#b34fff"
  }
});



export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: false,
      loggedInUserName: null,
      text: ""
    };
    this.getEvents = this.getEvents.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
    this.navToEvent = this.props.navigation.navigate.bind(this);
  }

  getEvents() {
    fetch(`${apiUrl}/users/${loggedInUser}`)
      .then(res => res.json())
      .then(({ events, user }) => {
        this.setState({
          events,
          user
        })
      })
  }


  componentDidMount() {
    this.getEvents();
  }

  joinEvent() {
    fetch(`${apiUrl}/users/${loggedInUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.text,
        username: loggedInUserName
      })
    })
      .then((response) => {
        this.getEvents();
      })
      .catch((err) => console.log(err));
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>NOMinate</Text>
        </View>
        <View style={styles.body}>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.eventList}>Upcoming and Past Events</Text>
            </View>
            {!this.state.events ?
              <Text style={styles.loading}>Loading events...</Text>
              : this.state.events.length ?
                <EventList navigation={this.navToEvent} events={this.state.events} />
                : <Text style={styles.loading}> Join or create an event! </Text>
            }
          </View>
          <View style={styles.joinContainer}>
            <TextInput style={styles.input}
              placeholder="Enter Event Code"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text} />
            <TouchableOpacity onPress={this.joinEvent} style={styles.join}><Text style={styles.joinText}>Join Event!</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
