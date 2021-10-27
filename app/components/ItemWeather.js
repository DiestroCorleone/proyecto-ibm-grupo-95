import React from 'react';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import styles from '../../Styles';

export default function ItemWeather(props){
  const { title, onPress, iconFromApi } = props;

  return(
    <ListItem button onPress={onPress} bottomDivider style={styles.listItem} >
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Avatar source={{uri: iconFromApi}} />
    </ListItem>
  );       
}

export function CityListItem(props){
  const { title, onPress, iconFromApi } = props;

  return(
    <ListItem button onPress={onPress} bottomDivider style={styles.listItem} >
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>      
      <Avatar source={{uri: iconFromApi}} />
    </ListItem>
  );       
}