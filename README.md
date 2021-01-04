# XState <-> React Navigation integration

This repository implements an example payment authorization flow for a banking app implemented with React Native, React Navigation and XState.

It is provided as example to [this series of blog posts](https://medium.com/welld-tech/untangle-complex-flows-in-your-react-native-app-with-xstate-1b11d0b8a91f). 

# Project Structure

The project is an Expo Managed project initialised with the Expo CLI.
These are the main files/directories:

```
components/
paymentauthorization/
    screens/
    machine.js
    ...
App.js
```

- `components/`: components reused across multiple screens;
- `paymentauthorization/`: payment authorization flow implementation;
- `paymentauthorization/screens/`: payment authorization flow screens;
- `paymentauthorization/machine.js`: XState state machine implementation;
- `App.js`: main App file

# Building and running the app

Refer to the [instructions](https://docs.expo.io/workflow/development-mode/) for managed workflow in the Expo docs.

- Run on Android emulator: `npm run android`
- Run on iOS simulator: `npm run ios`

# Notes

**This implementation is not production ready!** It is just meant as an example of how to integrate XState and React Native/React Navigation.


