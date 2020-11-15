import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons"; // Sun icon
import { Fontisto } from "@expo/vector-icons"; // Cloudy icon
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const InfoCard = (props) => {
  const styles = StyleSheet.create({
    card: {
      alignItems: "center",
      margin: 10,
      minWidth: 150,
    },
    text: {
      color: "#e8e8e8",
      margin: 5,
      marginLeft: 15,
      fontSize: 12,
    },
  });

  const Icon = () => {};

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text}>{props.value}</Text>
    </View>
  );
};

export default InfoCard;
