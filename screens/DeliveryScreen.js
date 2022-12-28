import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../config";
import * as Progress from "react-native-progress";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function DeliveryScreen() {
  const restaurant = useSelector((store) => store.restaurant.restaurant);
  const navigation = useNavigation();

  // useFocusEffect(() => {
  //   const subscription = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       navigation.navigate("Home");
  //       return true;
  //     }
  //   );

  //   return () => subscription.remove();
  // });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
      // Prompt the user before leaving the screen
      unsubscribe();
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () =>
              navigation.dispatch(CommonActions.navigate({ name: "Home" })),
          },
        ]
      );
    });
  }, [navigation]);

  return (
    <View className="bg-primary flex-1">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-8 mx-4">
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="ios-exit-outline"
              size={24}
              color={colors.secondary}
            />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg tracking-wide">
            Order Help
          </Text>
        </View>
        <View className="bg-white shadow-2xl p-4 rounded m-8 z-50">
          <Text className="text-gray-400">Estimated Arrival</Text>
          <Text className="text-3xl font-extrabold tracking-tighter mb-4">
            45 - 55 minutes
          </Text>
          <Progress.Bar size={30} indeterminate color={colors.secondary} />
        </View>
      </SafeAreaView>
      <View className="flex-1 -mt-20">
        <MapView
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
          />
        </MapView>
      </View>
    </View>
  );
}
