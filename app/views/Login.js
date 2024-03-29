// Login screen
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@rneui/base';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '../../config';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Handle login function called');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const {success, token, id, role, name} = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', id);
      await AsyncStorage.setItem('userLoggedIn', success.toString());
      await AsyncStorage.setItem('userName', name);
      // Navigate to the home
      if (success) navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLogin = () => {
    console.log('cancel login'); //TODO:
  };
  const createAccount = () => {
    console.log('create account'); //TODO:
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput style={styles.inputs} onChangeText={setEmail} value={email} />
      <Text style={styles.labels}>Enter Email</Text>

      <TextInput
        style={styles.inputs}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Text style={styles.labels}>Enter Password</Text>
      <Button
        containerStyle={{margin: 5}}
        buttonStyle={{width: 150}}
        onPress={handleLogin}
        title="Login"
      />
      <Button
        onPress={cancelLogin}
        containerStyle={{margin: 5}}
        buttonStyle={{width: 150}}
        title="Cancel"
      />
      <Button
        containerStyle={{margin: 5}}
        buttonStyle={{width: 150}}
        onPress={createAccount}
        title="Create Account"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
    paddingTop: '5%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputs: {
    width: '80%',
    marginTop: 15,
    borderWidth: 1,
    height: 45,
    fontSize: 16,
    color: '#000000',
  },
  labels: {
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
