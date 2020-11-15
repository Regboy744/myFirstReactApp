import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCordinates = this.getCordinates.bind(this);
    this.reverseGeoCoordinates = this.reverseGeoCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCordinates, this.handleLocationError);
      const { latitude, longitude, userAddress } = this.state;
    } else {
      alert("Geolocation is not supported on this browser");
    }
  }

  getCordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    this.reverseGeoCoordinates();
  }

  reverseGeoCoordinates() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyCO99I9kCQHN1J9O4F3IjrhuQCl8MIkJ7k`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          userAddress: data.results[0].formatted_address,
        })
      )
      .catch((error) => alert(error));
  }

  componentDidMount() {
    this.getLocation();
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        alert = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        alert = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        alert = "An unknown error occurred.";
        break;
      default:
        alert = "An unknown error occurred.";
    }
  }

  render() {
    return (
      <ImageBackground source={require("../images/bg.jpg")} blurRadius={1} style={styles.container}>
        <View style={styles.overlay}>
          <Image source={require("../images/marker.png")} style={{ width: 100, height: 100 }} />
          <Text style={styles.heading1}>Welcome Page!</Text>
          <Text style={styles.heading3}>Latitude:{this.state.latitude}</Text>
          <Text style={styles.heading3}>Longitude:{this.state.longitude}</Text>
          <Text style={styles.heading2}>{this.state.userAddress}</Text>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#00000070",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  heading3: {
    color: "#fff",
    margin: 5,
  },
});

export default Home;
