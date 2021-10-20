import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import styles from '../../Styles';

export default function ItemWeather(props){
  const { key, title, iconType, icon, iconColor } = props;

  return(
    <ListItem key={key} bottomDivider style={styles.listItem}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
        <Icon            
          type={iconType}
          name={icon}
          color={iconColor}
        />
    </ListItem>
  );       
}