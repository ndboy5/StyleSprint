import {Card, ListItem, Icon, Badge, Button, Text} from '@rneui/base';

const BodyPartList = ({bodyPart, measurements}) => {
  return (
    <Card>
      <Text h5>{bodyPart}</Text>
      {measurements.map(m => {
        return (
          <ListItem.Swipeable
            key={m._id}
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
              <ListItem.Title>{m.name} </ListItem.Title>
              <ListItem.Subtitle>{m.size}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        );
      })}
    </Card>
  );
};

export default BodyPartList;
