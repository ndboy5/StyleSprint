import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_URL} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';

const MeasurementList = () => {
  const navigation = useNavigation();
  const [measurements, setMeasurements] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  //Get the list of measurements from the user's account
  const fetchUserMeasurements = async () => {
    setToken(await AsyncStorage.getItem('token'));
    setUserId(await AsyncStorage.getItem('user'));
    const config = {headers: {Authorization: `Bearer ${token}`}};

    const response = await axios.get(
      `${API_URL}/measurements/account/` + userId,
      config,
    );
    setMeasurements(response.data.data);
  };

  useEffect(() => {
    fetchUserMeasurements();
  }, []);

  const onClickMeasurement = item => {
    navigation.navigate('Measurement', {item});
  };

  const handleDeleteById = async id => {
    const config = {headers: {Authorization: `Bearer ${token}`}};

    try {
      //Get the list of measurements from the user's account
      const response = await axios.delete(
        `${API_URL}/measurements/` + id,
        config,
      );
      const {success, data} = response.data;
      console.log(`${success} ${data}`);
      if (success) {
        let newList = measurements.filter(m => m._id !== id);
        setMeasurements(newList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => (
    // <TouchableOpacity onPress={() => console.log(item)}>
    <TouchableOpacity>
      <ListItem bottomDivider onPress={() => onClickMeasurement(item)}>
        <Icon name="address-book" type="font-awesome" color="#517fa4" />
        {item.gender === 'M' ? (
          <Icon name="male" type="font-awesome" color="#517fa4" />
        ) : (
          <Icon name="female" type="font-awesome" color="#517fa4" />
        )}
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({item}) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => handleDeleteById(item._id)}
        style={[styles.backLeftBtn, styles.backLeftBtnLeft]}>
        <Icon name="trash" type="font-awesome" color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Button title="Refresh" onPress={fetchUserMeasurements} />
      <SwipeListView
        data={measurements}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLeftBtn: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    position: 'absolute',
    width: 75,
  },
  backLeftBtnLeft: {
    left: 0,
  },
});

export default MeasurementList;
