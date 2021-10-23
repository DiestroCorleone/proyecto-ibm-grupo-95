import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from '../../Styles';

export default function Loading(props){
  const {isVisible, text } = props;

  return(
    <Overlay
      isVisible={ isVisible }
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={ styles.loading }
    >
      <View>
        <ActivityIndicator
          size="large"
          color="dodgerblue"
        />
        { text && <Text>{ text }</Text> }
      </View>
    </Overlay>
  );

}