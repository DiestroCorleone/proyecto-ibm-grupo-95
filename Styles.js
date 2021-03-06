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

  alignTop: {
    justifyContent: 'flex-start',
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
  
  overlay: {
    width: '80%',
    height: '80%',
    borderRadius:30,
    padding:20,
    backgroundColor:'#fff',
  },

  TextModal:{
    fontSize: 12,
    marginBottom:30,
    color:'#000',
    height:'85%',

  },

  buttonContent:{
    width:'100%',
    flex:1,
    alignItems: 'flex-end',
    justifyContent:'flex-end',
  },

  BtnModal: {
    backgroundColor: '#a3000e',
    borderRadius:100,
    width:100,
    
  },

  overlayCity:{
    height:200,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
  },  

  BtnCity:{
    width:200,
    borderRadius:20,
    margin:10,
    padding:12,
  },

  overlayCityAdd:{

    justifyContent:'center',
    alignContent:'center',
    width:250,
    height:350,
    borderRadius:30,
  },


  backgroundSky: {
    backgroundColor: 'skyblue',
  },

  backgroundLavender: {
    backgroundColor: 'lavender',
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  bottom: {
    marginTop: '50%',
  },

  margin: {
    marginLeft:30,
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
  },

  homeFrase:{
    color: '#fff',
    fontSize:17,
    marginTop:20,
  },

  imgHome:{
    width:300,
    height:180,
    marginBottom:30,
    marginTop:30,
  },

  mapStyle:{
    width: "90%",
    height: 400,
    marginTop: 30,
  },

  map: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  
});