import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * A screen for an error state, with a customizable error message.
 */
function AuthorizationErrorScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>{route.params.message ?? "An unexpected error occurred."}</Text>
        <Button title="Contact our help center" />
      </View>
      <Button title="Dismiss" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthorizationErrorScreen;
