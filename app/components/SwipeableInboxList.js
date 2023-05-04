import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import measurement from './data';

const SwipeableInboxList = () => {
  const [measurements, setMeasurements] = useState([]);
  //Get the list of measurements from the user's account
  const data = measurement;

  console.log(data);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('user');
      const config = {headers: {Authorization: `Bearer ${token}`}};
      //Get the list of measurements from the user's account
      const response = await axios.get(
        'http://localhost:5000/api/v1/measurement/account/' + userId,
        config,
      );
      setMeasurements(response.data);
    };

    fetchUser();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity>
      <ListItem bottomDivider>
        <Icon name={item.icon} type="font-awesome" color="#517fa4" />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
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
      data={data}
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
