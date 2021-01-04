import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Timer from "../components/Timer";
import PaymentAuthorizationMachineContext from "./context";

function PaymentAuthorizationTimer() {
  const [state, send, service] = useContext(PaymentAuthorizationMachineContext);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      if (state.matches("authorizationExpired")) {
        navigation.navigate("AuthorizationError", {
          message: "Payment authorization has expired.",
        });
      }
    });

    return subscription.unsubscribe;
  }, [service]);

  return state.context.expiresOn ? (
    <Timer expiresOn={state.context.expiresOn} />
  ) : null;
}

export default PaymentAuthorizationTimer;
