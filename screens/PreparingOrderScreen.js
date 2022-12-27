import { View, SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function PreparingOrderScreen() {
  const navigation = useNavigation();
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate("DeliveryScreen");
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/gifs/citygif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-[80%]"
      />
      <Animatable.Text
        iterationCount={1}
        animation="slideInUp"
        className="text-white font-bold text-lg"
      >
        Hold on tight, your order is coming up ...
      </Animatable.Text>
      <ActivityIndicator size={60} color="white" className="mt-4" />
    </SafeAreaView>
  );
}
