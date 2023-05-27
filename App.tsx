import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import SwipeableInboxList from './app/components/SwipeableInboxList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import LoginScreen from './app/views/Login';
import StyleSprintHeader from './app/components/Header';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const myToken = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('user');
      setUserId(userId);
      setToken(myToken);
    };

    getUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          // component={SwipeableInboxList}
          children={props => <SwipeableInboxList {...props} user={userId} />}
          options={{header: () => <StyleSprintHeader />}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: 'false'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
