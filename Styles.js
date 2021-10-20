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

  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: "50%",
  },

  overlay: {
    width: "80%",
    height: "80%",
  },

  imageResponsive: {
    marginTop: "10%",
    width: "100%",
    height: 150,
  },

  input: {
    width: "80%",
  },

  listItem: {
    width: "90%",
    margin: "2%",
    borderRadius: 10,
    overflow: "hidden",
  }
})