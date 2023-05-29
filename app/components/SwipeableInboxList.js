import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import measurement from './data';
import {API_URL} from '../../config';

const SwipeableInboxList = () => {
  const [measurements, setMeasurements] = useState(null);
  //Get the list of measurements from the user's account
  const data = measurement;
  useEffect(() => {
    const fetchUserMeasurements = async () => {
      //fetch user from storage
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('user');
      const config = {headers: {Authorization: `Bearer ${token}`}};

      //Get the list of measurements from the user's account
      const response = await axios.get(
        `${API_URL}/measurements/account/` + userId,
        config,
      );
      // console.log(response.data.data);
      setMeasurements(response.data.data);
    };

    fetchUserMeasurements();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity>
      <ListItem bottomDivider>
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
      <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]}>
        <Icon name="trash" type="font-awesome" color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={measurements}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      keyExtractor={(item, index) => index.toString()}
    />
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

export default SwipeableInboxList;
