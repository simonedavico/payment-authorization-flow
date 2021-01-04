import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import PaymentAuthorizationMachineContext from "../context";
import PaymentAuthorizationTimer from "../PaymentAuthorizationTimer";

function StartScreen({ navigation }) {
  const [state, send, service] = useContext(PaymentAuthorizationMachineContext);

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      if (state.matches("authorizationDismissed")) {
        navigation.navigate("AuthorizationDeclined");
      } else if (state.matches("prerequisitesNotMet")) {
        navigation.navigate("AuthorizationError", {
          message: "Cannot authorize payments on this device.",
        });
      }
    });

    return subscription.unsubscribe;
  }, [service, navigation]);

  const isLoading =
    state.matches("checkPrerequisites") ||
    state.matches("fetchingPaymentDetails");

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator animating={isLoading} />
          <Text>
            {state.matches("checkPrerequisites")
              ? "Checking enrolled biometric factor..."
              : "Fetching payment details..."}
          </Text>
        </>
      ) : (
        <>
          <View style={styles.flex}>
            <PaymentAuthorizationTimer />
            <View style={styles.container}>
              <Text>Payment Details would be displayed here</Text>
            </View>
          </View>
          <Button
            title="Approve"
            onPress={() => navigation.navigate("AuthorizationBiometric")}
          />
          <Button title="Decline" onPress={() => send("DISMISS")} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1 },
});

export default StartScreen;
