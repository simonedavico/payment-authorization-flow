import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useMachine } from "@xstate/react";
import * as LocalAuthentication from "expo-local-authentication";
import PaymentAuthorizationMachineContext from "../context";
import StartScreen from "./StartScreen";
import AuthorizationDeclinedScreen from "./AuthorizationDeclinedScreen";
import machine from "../machine";
import AuthorizationErrorScreen from "./AuthorizationErrorScreen";
import AuthorizationBiometricScreen from "./AuthorizationBiometricScreen";
import PaymentAuthorizedScreen from "./PaymentAuthorizedScreen";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const PaymentAuthorizationStack = createStackNavigator();

function PaymentAuthorizationScreen() {
  const authMachine = useMachine(machine, {
    services: {
      checkPrerequisites: async () => {
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        return isEnrolled ? Promise.resolve() : Promise.reject();
      },
      fetchPaymentDetails: async () => {
        await wait(2000);
        return {
          paymentAuthorizationId: 123,
          // the payment authorization expires 15 seconds after being received
          expiresOn: new Date(Date.now() + 45000),
        };
      },
      authorizePayment: () => Promise.resolve(),
    },
  });

  return (
    <PaymentAuthorizationMachineContext.Provider value={authMachine}>
      <PaymentAuthorizationStack.Navigator>
        <PaymentAuthorizationStack.Screen
          name="Start"
          component={StartScreen}
        />
        <PaymentAuthorizationStack.Screen
          name="AuthorizationBiometric"
          component={AuthorizationBiometricScreen}
          options={{
            title: "Authorization in Progress",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <PaymentAuthorizationStack.Screen
          name="PaymentAuthorized"
          component={PaymentAuthorizedScreen}
          options={{
            title: "Authorization Success",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <PaymentAuthorizationStack.Screen
          name="AuthorizationDeclined"
          component={AuthorizationDeclinedScreen}
          options={{
            title: "Authorization Declined",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <PaymentAuthorizationStack.Screen
          name="AuthorizationError"
          component={AuthorizationErrorScreen}
          options={{
            title: "Authorization Error",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      </PaymentAuthorizationStack.Navigator>
    </PaymentAuthorizationMachineContext.Provider>
  );
}

export default PaymentAuthorizationScreen;
