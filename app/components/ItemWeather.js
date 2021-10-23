import React from 'react';
import { ListItem, Icon, Image } from 'react-native-elements';
import styles from '../../Styles';

export default function ItemWeather(props){
  const { key, title, iconType, icon, iconColor, onPress, iconFromApi = false } = props;

  return(
    <ListItem button onPress={onPress} key={key} bottomDivider style={styles.listItem} >
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
        { iconFromApi
          ? <Image
              source={require(iconFromApi)}
            />
          : <Icon            
              type={iconType}
              name={icon}
              color={iconColor}
            />
        }
    </ListItem>
  );       
}