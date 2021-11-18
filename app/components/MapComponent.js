import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../Styles';

export default function MapCompnent(props){
  const { markers } = props;
  return(
    <View style={styles.map}> 
      <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: -34.603722,
            longitude: -58.381592,
            latitudeDelta: 15,
            longitudeDelta: 15,
          }}
      >
          { markers &&
            markers.map((item, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: item.lat , longitude: item.lon }}
              title={ item.city }
              description={"Soy un marcador"}
              pinColor={ '#ff0000' }
            />
            ))
          }
      </MapView>
     </View> 
  );
}

