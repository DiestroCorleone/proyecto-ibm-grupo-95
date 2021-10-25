import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },

  spaceAround: {
    justifyContent: 'space-around',
  },

  row: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  h1: {
    fontSize: 40,
    textAlign: 'center',
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  backgroundPurple: {
    backgroundColor: 'mediumpurple',
  },

  backgroundBlue: {
    backgroundColor: 'dodgerblue',
  },

  backgroundRed: {
    backgroundColor: 'crimson',
  },

  textWhite: {
    color: 'white',
  },

  textButton: {
    padding: 15,    
    borderRadius: 10,
  },

  bottom: {
    marginTop: '50%',
  },

  margin: {
    margin: '1%',
  },

  overlay: {
    width: '80%',
    height: '80%',
  },

  imageResponsive: {
    marginTop: '10%',
    width: '100%',
    height: 150,
  },

  input: {
    width: '80%',
  },

  oneQuarter: {
    width: "25%",
  },

  marginSmall: {
    margin: "5%",
  },

  threeQuarters: {
    width: "75%",
  },

  listItem: {
    width: '90%',
    margin: '2%',
    borderRadius: 10,
    overflow: 'hidden',
  },

  fullWidth: {
    width: '100%',
  },

  fullHeigth: {
    height: '100%',
  },

  loading: {
    width: 200,
    height: 100,
    textAlign: "center",
  }
});