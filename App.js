import { WebView } from "react-native-webview";
import {
  BackHandler,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import FAB from "react-native-fab";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const webViewRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack();
    } catch (err) {}
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <WebView
        source={{ uri: "https://pet.noelzappy.xyz/" }}
        ref={webViewRef}
        originWhiteList={["*"]}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />

      {isLoading ? (
        <ImageBackground
          source={require("./assets/bgsmall.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </ImageBackground>
      ) : (
        <FAB
          buttonColor="#8A5CF7"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            webViewRef.current.reload();
          }}
          visible={true}
          iconTextComponent={<Ionicons name="refresh-circle" />}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
