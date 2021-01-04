import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * A screen displayed when the user declines a payment authorization.
 * 
 * N.B: this could have been replaced by another AuthorizationErrorScreen, but it demonstrates
 * that we are flexible in implementing custom views for specific errors.
 */
function AuthorizationDeclinedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Payment authorization has been declined.</Text>
        <Text>Do not recognise this payment?</Text>
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

export default AuthorizationDeclinedScreen;
