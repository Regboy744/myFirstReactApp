import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons"; // Sun icon
import { EvilIcons } from "@expo/vector-icons"; // refresh icon
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MainCard from "./MainCard";
import InfoCard from "./InfoCard";
import getCurrentWeather from "../api/weather";
import { HourFormat } from "react-native-hour-format";

export default function Weather() {
  //Creates useState (variables)
  //The variables must always be above to the code
  const [darkTheme, setDarktheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState("27");
  const [location, setLocation] = useState("IE, Dublin");
  const [time, setTime] = useState("13:00");
  const [wind, setWind] = useState(65);
  const [humidity, setHumidity] = useState(80);
  const [tempMin, setTenpMin] = useState(21);
  const [tempMax, setTempMax] = useState(31);
  const [locationCoords, setLocationCoords] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
      alignItems: "center",
      justifyContent: "center",
    },
    temparature: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 5,
    },
    temperatureText: {
      color: darkTheme ? "#e0e0e0" : "black",
      fontSize: 40,
    },
    refresh: {
      position: "relative",
      alignSelf: "flex-end",
      margin: 10,
    },
    cardView: {
      color: darkTheme ? "black" : "white",
      marginHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    info: {
      marginTop: -10,
      alignItems: "center",
      backgroundColor: darkTheme ? "#393e54" : "#8f8f8f",
      borderRadius: 10,
      width: 350,
      height: 200,
    },
    infoText: {
      color: darkTheme ? "#e0e0e0" : "white",
      margin: 10,
      fontSize: 20,
      fontWeight: "bold",
    },
    infoCard: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    themeButton: {
      marginLeft: 280,
      marginTop: -35,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? "#ffffff" : "#ffffff",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
    circleButton: {
      backgroundColor: darkTheme ? "#232634" : "#232634",
      alignSelf: darkTheme ? "flex-end" : "flex-start",
      margin: 5,
      height: 20,
      width: 20,
      borderRadius: 50,
    },
  });

  async function setCurrentWeather() {
    await getLocation();

    let date = new Date();

    setTime(date.getHours() + ":" + date.getMinutes());

    const data = await getCurrentWeather(locationCoords);
    setCurrentTemperature(convertToC(data[0]));
    setTenpMin(convertToC(data[1]));
    setTempMax(convertToC(data[2]));
    setLocation(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
  }

  function convertToC(kelvin) {
    return parseInt(kelvin - 273.15);
  }

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("No permition");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await setLocationCoords(location.coords);
    }
  }

  useEffect(() => {
    setCurrentWeather();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refresh}>
        <EvilIcons onPress={() => setCurrentWeather()} name="refresh" size={30} color={darkTheme ? "white" : "black"} />
      </TouchableOpacity>

      <Feather name="sun" style={{ marginTop: 5 }} size={40} color={"orange"} name="sun" size={24} color="orange" />
      <View style={styles.temparature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        {/* THE NEX LINE USES AN ESPECIFIC STYLE FOR ITSELF */}
        <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, { fontSize: 14 }]}>
        {location}, {time}
      </Text>

      {/* CARDS COMPONENT FROM MainCard */}

      <View style={styles.cardView}>
        {/* THE COLOR CHANGES ACCORDING TOE THE USER OPTION HERE backgroundColor IS THE PROPS IN MainCard */}
        <MainCard icon={"morning"} temperature={25} title={"Mornig"} backgroundColor={darkTheme ? "#ff873d" : "#cc6e30"} style={styles.morning}></MainCard>
        <MainCard icon={"afternoon"} temperature={25} title={"Afternoon"} backgroundColor={darkTheme ? "#d29600" : "#fcc63f"} style={styles.afternoon}></MainCard>
        <MainCard icon={"night"} temperature={25} title={"Night"} backgroundColor={darkTheme ? "#008081" : "#38b7b8"} style={styles.night}></MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Details</Text>
        <View style={styles.infoCard}>
          <InfoCard title={"Wind"} value={wind + " m/h"}></InfoCard>
          <InfoCard title={"Humidity"} value={humidity + " %"}></InfoCard>
          <InfoCard title={"Tem. Min"} value={tempMin + " °"}></InfoCard>
          <InfoCard title={"Tem. Max"} value={tempMax + " °"}></InfoCard>
        </View>

        <View style={styles.themeButton}>
          <View style={styles.squareButton}>
            <TouchableOpacity style={styles.circleButton} onPress={() => (darkTheme ? setDarktheme(false) : setDarktheme(true))}></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
