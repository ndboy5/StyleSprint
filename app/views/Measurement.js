import React, {useState} from 'react';
import {Text, Button, Card, ListItem, Icon} from '@rneui/base';
import {View} from 'react-native';

const Measurement = ({item}) => {
  return (
    <View>
      <Card>
        <Text h3>Danny's Measurement</Text>
        <Text h6>Danny's decription</Text>
        <Text>Unit: CM</Text>
        <Card.Divider />
        <Button size="sm" type="clear">
          Learn More
        </Button>
      </Card>
      <Card>
        <Text h4>Upper Body </Text>
        <ListItem.Swipeable
          leftWidth={80}
          rightWidth={90}
          minSlideWidth={40}
          leftContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{
                name: 'archive-outline',
                type: 'material-community',
              }}
              onPress={action}
            />
          )}
          rightContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{name: 'delete-outline'}}
              onPress={action}
            />
          )}>
          <Icon name="label-important-outline" type="material" />
          <ListItem.Content>
            <ListItem.Title>Email from John Doe</ListItem.Title>
            <ListItem.Subtitle>Hey, I'm John Doe</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
        <ListItem.Swipeable
          leftWidth={80}
          rightWidth={90}
          minSlideWidth={40}
          leftContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{
                name: 'archive-outline',
                type: 'material-community',
              }}
              onPress={action}
            />
          )}
          rightContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{name: 'delete-outline'}}
              onPress={action}
            />
          )}>
          <Icon name="label-important-outline" type="material" />
          <ListItem.Content>
            <ListItem.Title>Email from John Doe</ListItem.Title>
            <ListItem.Subtitle>Hey, I'm John Doe</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      </Card>
      <Card>
        <Text h4>Lower Body </Text>
        <ListItem.Swipeable
          leftWidth={80}
          rightWidth={90}
          minSlideWidth={40}
          leftContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{
                name: 'archive-outline',
                type: 'material-community',
              }}
              onPress={action}
            />
          )}
          rightContent={action => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{name: 'delete-outline'}}
              onPress={action}
            />
          )}>
          <Icon name="label-important-outline" type="material" />
          <ListItem.Content>
            <ListItem.Title>Email from John Doe</ListItem.Title>
            <ListItem.Subtitle>Hey, I'm John Doe</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      </Card>
    </View>
  );
};

export default Measurement;
