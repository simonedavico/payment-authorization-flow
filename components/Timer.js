import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import format from "date-fns/format";

function Timer({ expiresOn }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const countdown = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(countdown);
  });

  return (
    <View style={styles.container}>
      <Text>Time to Expiration</Text>
      <Text style={styles.timer}>
        {format(expiresOn.getTime() - now, "mm:ss")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
  timer: {
    fontSize: 32,
  },
});

export default Timer;
