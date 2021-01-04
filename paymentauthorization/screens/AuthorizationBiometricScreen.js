import React, { useEffect, useContext } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import PaymentAuthorizationTimer from "../PaymentAuthorizationTimer";
import PaymentAuthorizationMachineContext from "../context";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * In a real app we would access some Keychain/Keystore protected resource
 * we could also simulate the scenario with LocalAuthentication.authenticateAsync({ disableDeviceFallback: true })
 * 
 * N.B: Beware of tampering! https://blog.mindedsecurity.com/2020/07/implementing-secure-biometric.html
 */
const accessKeychainResource = async () => {
  await wait(2000);
  return { success: true };
};

function AuthorizationBiometricScreen({ navigation }) {
  const [state, send, service] = useContext(PaymentAuthorizationMachineContext);

  useEffect(() => {
    accessKeychainResource()
      .then(({ success }) => {
        send(success ? "KEYCHAIN_ACCESS_OK" : "KEYCHAIN_ACCESS_KO");
      })
      // handle the case in which we get an error from accessKeychainResource
      .catch(() => {
        send("KEYCHAIN_ACCESS_KO");
      });

    return Platform.select({
      // in a real app, we may need to cancel authentication
      android: () => {},
      ios: () => {},
    });
  }, []);

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      if (state.matches("paymentAuthorized")) {
        navigation.navigate("PaymentAuthorized");
      } else if (state.matches("biometricFactorError")) {
        navigation.navigate("AuthorizationError", {
          message: "Something went wrong with biometric authentication.",
        });
      } else if (state.matches("authorizationError")) {
        navigation.navigate("AuthorizationError", {
          message: "Something went wrong while authorizing the payment.",
        });
      }
    });

    return subscription.unsubscribe;
  }, [service]);

  const isLoading = state.matches("authorizingPayment");

  return (
    <SafeAreaView style={styles.container}>
      <PaymentAuthorizationTimer />
      <View style={styles.container}>
        <Entypo name="fingerprint" size={96} />
        {state.matches("paymentDetailsFetched") ? (
          <Text>Checking biometric factor...</Text>
        ) : null}
        <ActivityIndicator animating={isLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: 'center' },
});

export default AuthorizationBiometricScreen;
