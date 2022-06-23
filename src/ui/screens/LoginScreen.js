import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
export default LoginScreen = ({navigation}) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const styles = StyleSheet.create({
        mainView:{
            padding:10,
            backgroundColor:'white',
            flex:1,
            alignContent: 'center',
            justifyContent:'center',
            flexDirection:'column',
        },
        edxBoxes:{
            margin:5,
            marginHorizontal:16,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor:'white',

        },
        btnAction1:{
            marginVertical: 24,
            paddingHorizontal: 48,
            alignSelf: 'center',
            backgroundColor:'black'
        },
        action2:{
          color:'black'
        },
        txv1:{
          alignSelf:'center'
        }
    })

    const onLoginButtonPress = () => {

      if(email.length === 0){
        alert("Email or Merchant ID Field can't be Empty")
      }
      else if(email.length === 0){
        alert("Password or Token field can't be Empty")
      }

      else{

        auth().signInWithEmailAndPassword(email,password).then(res=>{
        
        })
        .catch(err=> {
          alert("Login Unsuccessfull")
          console.log(err);
        })

      }
    }

    const onGotoRegisterButtonClick = () => {
      navigation.navigate("Register");
    }

  return (
    <View style={styles.mainView} >

      <Image source={require('../../../assets/logo_ptecho.png')} style={{alignSelf:'center', width: 180, height:90}}/>
        
        <TextInput style={styles.edxBoxes} value={email} onChangeText={t=>setEmail(t)} placeholder='Email OR Merchant ID' keyboardType='email-address' selectionColor='black' activeUnderlineColor='black'/>
        <TextInput style={styles.edxBoxes} value={password} onChangeText={t=>setPassword(t)} placeholder='Password OR Token' selectionColor='black' activeUnderlineColor='black'/>

      <Button style={styles.btnAction1} onPress={onLoginButtonPress} mode='contained'>Login</Button>
      <Text style={styles.txv1}>Don't have a Merchant Account.</Text>
      <Button style={styles.action2} onPress={onGotoRegisterButtonClick} mode='text' color='blue'>{"Register here and use our API"}</Button>
    </View>

  );
}