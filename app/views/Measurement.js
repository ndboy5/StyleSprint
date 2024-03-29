import React, {useState} from 'react';
import {Badge, Text, Button, Card, ListItem, Icon} from '@rneui/base';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BodyPartList from '../components/bodyPartList';

const Measurement = () => {
  const route = useRoute();
  const {item} = route.params;
  // const [measure, setMeasure] = useState(item);

  const onUpdateMeasurement = () => {
    console.log('you called update measurement handler');
  };

  const onClickSaveButton = () => {
    console.log('clisked the save button');
  };
  return (
    <View>
      <Card>
        <Text h3>{item.name}</Text>
        <Text h5>{item.description}</Text>
        <Card.Divider />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Badge value={item.unit} status="error" />
          <Badge value={item.type} status="warning" />
          <Badge value={item.owner} status="success" />
          <Badge
            value={item.lastUpdateDate.substring(0, 10)}
            status="primary"
          />

          {item.gender === 'M' ? (
            <Icon name="male" type="font-awesome" color="#517fa4" />
          ) : (
            <Icon name="female" type="font-awesome" color="#517fa4" />
          )}
        </View>
        <Button color="secondary" onPress={onClickSaveButton}>
          Save
        </Button>
      </Card>
      {item && item.upperBodyMeasure && (
        <BodyPartList
          bodyPart="Upper Body"
          measurements={item.upperBodyMeasure}
          // setMeasure={setMeasure}
        />
      )}
      {item && item.lowerBodyMeasure && (
        <BodyPartList
          bodyPart="Lower Body"
          measurements={item.lowerBodyMeasure}
        />
      )}
      {item && item.bodiceMeasure && (
        <BodyPartList bodyPart="Bodice" measurements={item.bodiceMeasure} />
      )}
      {item && item.skirtMeasure && (
        <BodyPartList bodyPart="Skirt" measurements={item.skirtMeasure} />
      )}

      {item && item.trouserMeasure && (
        <BodyPartList bodyPart="Trouser" measurements={item.trouserMeasure} />
      )}
    </View>
  );
};

export default Measurement;
