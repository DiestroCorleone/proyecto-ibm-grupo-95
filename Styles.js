import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,    
  },

  spaceAround: {
    justifyContent: "space-around",
  },
  
  row: {
    flexDirection: "row",
  },

  column: {
    flexDirection: "column",
  },

  h1: {
    fontSize: 40,
    textAlign: "center",
  },

  background: {
    minHeight: "100%",
  },

  backgroundPurple: {
    backgroundColor: "mediumpurple",
  },

  textWhite: {
    color: "white",
  },

  bottom: {
    marginTop: "80%",
  },

  overlay: {
    width: "80%",
    height: "80%",
  }
})