import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import { UserSchema } from '../../schemas/UserSchema';

export default RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = React.useState("");
  const [merchantName, setMerchantName] = React.useState("");
  const [merchantContactNumber, setMerchantContactNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  


  const styles = StyleSheet.create({
    mainView: {
      padding: 10,
      backgroundColor: 'white',
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    edxBoxes: {
      margin: 5,
      marginHorizontal: 16,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: 'white',

    },
    btnAction1: {
      marginVertical: 24,
      paddingHorizontal: 48,
      alignSelf: 'center',
      backgroundColor: 'black'
    },
    action2: {
      color: 'black'
    },
    txv1: {
      alignSelf: 'center'
    }
  })

  const onRegisterButtonPress = () => {

    if (email.length === 0) {
      alert("Email Field can't be Empty")
    }
    else if (email.length === 0) {
      alert("Password Field can't be Empty")
    }

    else if (merchantContactNumber.length === 0 || merchantContactNumber.length < 11) {
      alert("Contact No. Field can't be Empty and Should be >=11 digits")
    }

    else if (merchantName.length === 0) {
      alert("Merchant Name Field can't be Empty")
    }

    else {


      auth().createUserWithEmailAndPassword(email, password).then((res) => {
        
          let user = new UserSchema(merchantName, merchantContactNumber, email, password, res.user.uid, new Array(), '', username);

          console.log("UID: " + user.id);
          firestore().collection("users").doc(user.id).set(user).then(res => {
            console.log(res.id);
          }).catch(erro => {
            console.log(erro);
          })
        }).catch(err => {
          alert("Register Unsuccessfull")
            console.log(err);
        });

  }
}

const onGotoLoginButtonClick = () => {
  navigation.navigate("Login");
}

return (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignContent: 'center' }}>
    <View style={styles.mainView} >

      <Image source={require('../../../assets/logo_ptecho.png')} style={{ alignSelf: 'center', width: 180, height: 90 }} />

      <TextInput style={styles.edxBoxes} value={username} onChangeText={t => setUsername(t)} placeholder='Your Name' selectionColor='black' activeUnderlineColor='black' />
      <TextInput style={styles.edxBoxes} value={email} onChangeText={t => setEmail(t)} placeholder='Email' keyboardType='email-address' selectionColor='black' activeUnderlineColor='black' />
      <TextInput style={styles.edxBoxes} value={merchantName} onChangeText={t => setMerchantName(t)} placeholder='Business Name' keyboardType='numbers-and-punctuation' selectionColor='black' activeUnderlineColor='black' />
      <TextInput style={styles.edxBoxes} value={merchantContactNumber} onChangeText={t => setMerchantContactNumber(t)} placeholder='Contact Number' keyboardType='phone-pad' selectionColor='black' activeUnderlineColor='black' />
      <TextInput style={styles.edxBoxes} value={password} onChangeText={t => setPassword(t)} placeholder='Password' selectionColor='black' activeUnderlineColor='black' />

      <Button style={styles.btnAction1} onPress={onRegisterButtonPress} mode='contained'>Register</Button>
      <Text style={styles.txv1}>Already have a Merchant Account.</Text>
      <Button style={styles.action2} onPress={onGotoLoginButtonClick} mode='text' color='blue'>{"Login to use the API"}</Button>

    </View>
  </ScrollView>

);
}