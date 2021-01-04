import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentAuthorizationScreen from "./paymentauthorization/screens";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.home}>
      <Text style={{
        fontSize: 24
      }}>Welcome to FancyBank</Text>
      <Text style={{ textAlign: "center" }}>
        Make sure to enroll a biometric factor on device to try the
        authorization flow.
      </Text>
      <Button
        title="Start payment authorization flow"
        onPress={() => navigation.navigate("PaymentAuthorization")}
      />
    </View>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="PaymentAuthorization"
            component={PaymentAuthorizationScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  home: { flex: 1, alignItems: "center", justifyContent: "center" },
});
