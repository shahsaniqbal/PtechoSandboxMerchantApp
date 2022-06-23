import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/ui/screens/LoginScreen';
import RegisterScreen from './src/ui/screens/RegisterScreen';
import MerchantCardsScreen from './src/ui/screens/MerchantCardsScreen';
import MerchantHomeScreen from './src/ui/screens/MerchantHomeScreen';

import MerchantProfileScreen from './src/ui/screens/MerchantProfileScreen';

import MerchantLinksScreen from './src/ui/screens/MerchantLinksScreen';

import SplashScreen from './src/ui/screens/SplashScreen'

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const [isSplash, setIsSplash] = React.useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View>
        <Text>Welcome</Text>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();


  if (isSplash) {
    return (
      <SplashScreen hide={() => {
        setIsSplash(false)
      }} />
    )
  }

  else {
    if (!user) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MerchantHomeScreen} />
          <Stack.Screen name="Cards" component={MerchantCardsScreen} />
          <Stack.Screen name="Profile" component={MerchantProfileScreen} />
          <Stack.Screen name="Links" component={MerchantLinksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

export default App;