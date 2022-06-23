import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default SplashScreen = ({ hide }) => {

  React.useEffect(()=>{
    try{
      setTimeout(()=>{
        hide();
      }, 5000)
    }
    catch(e){

    }
  })

  return (
    <View style={styles.mainView} >

      <Image source={require('../../../assets/logo_ptecho.png')} style={{ alignSelf: 'center', width: '100%', height: '40%' }} />

      <Text style={styles.sandbox} >
        {'Sandbox'}
      </Text>

      <Text style={styles.payments} >
        {'Payments'}
      </Text>

      <Text style={styles.testapp}>
        {'Test API App'}
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ptecho: {
    margin: 8,
    color:'black',
    fontFamily:'arial',
    fontSize:48,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center'
  },
  sandbox: {
    margin: 8,
    color:'black',
    fontFamily:'arial',
    fontSize:48,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center'
  },
  payments: {
    margin: 8,
    color:'black',
    fontSize:36,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center'
  },
  testapp: {
    margin: 8,
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center'
  }
})