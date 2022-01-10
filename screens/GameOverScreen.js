import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const correctImageSize = () => {
    if (availableDeviceHeight > availableDeviceWidth) {
      setImageSize(Dimensions.get("window").height * 0.6);
    } else {
      setImageSize(Dimensions.get("window").width * 0.8);
    }
  };

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [imageSize, setImageSize] = useState(
    availableDeviceHeight > availableDeviceWidth
      ? Dimensions.get("window").width * 0.8
      : Dimensions.get("window").height * 0.6
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
      correctImageSize;
    };
    const rotationListener = Dimensions.addEventListener(
      "change",
      updateLayout
    );

    return () => {
      rotationListener.remove();
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          }}
        >
          <Image
            source={require("../assets/success.png")}
            // source={{uri:"https://images.everydayhealth.com/images/everything-you-need-to-know-about-nonalcoholic-beer-1440x810.jpg"}}
            style={styles.image}
            resizeMode="cover"
            fadeDuration={2000}
          />
        </View>
        <View style={styles.resultConteiner}>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },

  resultConteiner: {
    marginHorizontal: Dimensions.get("window").height / 20,
    marginVertical: Dimensions.get("window").height / 60,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});

export default GameOverScreen;
