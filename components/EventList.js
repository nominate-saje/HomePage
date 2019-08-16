import React, { Component } from 'react';
import { Dimensions, Button, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  eventContainer: {
    borderWidth: 1,
    backgroundColor: "#b34fff",
    borderColor: "rebeccapurple",
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  scrollContainer: {
    height: height * 0.7
  }
})


openEvent = (event, nav) => {
  nav('EventPage', {event})
}

const EventList = (props) => (
  <ScrollView style={styles.scrollContainer}>
    {props.events.map((event, i) => (
      <TouchableOpacity onPress={() => {openEvent(event, props.navigation)}} style={styles.eventContainer}key={i}>
        <Text style={{ color: 'white' }}>{event.name}</Text>
        <Text>{event.date}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)

export default EventList;


