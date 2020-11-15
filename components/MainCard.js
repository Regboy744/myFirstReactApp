import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons"; // Sun icon
import { Fontisto } from "@expo/vector-icons"; // Cloudy icon
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MainCard = (props) => {
  const styles = StyleSheet.create({
    card: {
      // The code below gets the background color from darktheme in the Weather.js
      backgroundColor: props.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      margin: 5,
      width: "32%",
      height: "70%",
    },

    cardIcon: {
      color: "white",
      margin: 15,
    },
  });

  const Icon = () => {
    if (props.icon === "morning") {
      return <Feather name="sun" style={styles.cardIcon} size={40} />;
    }
    if (props.icon === "afternoon") {
      return <Fontisto style={styles.cardIcon} name="day-cloudy" size={24} />;
    }
    if (props.icon === "night") {
      return <Feather style={styles.cardIcon} name="cloud-rain" size={24} />;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{props.title}</Text>
      <Icon></Icon>
      {/* HERE WE WILL GET THE TEMPERATURE AS A PROP FROM THE Weather.js */}
      <Text style={styles.text}>{props.temperature}</Text>
    </View>
  );
};

export default MainCard;
