import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import CardComponent from "../components/CardInputForm";

import {CardSchema} from '../../schemas/CardSchema'

import Card from '../components/CardComponent';

export default MerchantCardScreen = (props) => {

  const [isAddCardModalDisplay, setIsCardModalDisplay] = React.useState(false);
  const [data, setData] = React.useState([]);


  React.useEffect(()=>{
    if(data.length==0){
      firestore().collection("Cards").where('merchantID', '==', auth().currentUser.uid).onSnapshot(data=>{
        setData(data.docs);
      })
    }
  }, [])


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

  const onLogout = () => {
    auth().signOut();
  }

  const actions = [
    {
      text: "Add Card",
      name: "bt_add_card",
      position: 1
    }
  ];


  const getCardDetails = (data) => {
    console.log(data);
    if (!(data.number.length >= 16 && data.cvc.length === 3 && data.expiry.length >4)) {
      //console.log(data);
    }

    else{
      firestore().collection('Cards').doc(data.number).set(
        new CardSchema(data.name, data.number, data.cvc, 0.0, data.expiry, auth().currentUser.uid, [])
      )
      setIsCardModalDisplay(false)
    }
  }

  const viewMyView = (isShown) => {
    setIsCardModalDisplay(isShown)
  }




  if(isAddCardModalDisplay){
    return (
      <View style={styles.mainView} >
  
        <CardComponent values={getCardDetails}/>
        
      </View>
  
    );
  }
  else{
    return (
      <View style={{...styles.mainView, flex:1}} >

        <FlatList data={data} renderItem={({item})=>{
          const { cardNumber, cardholderName, cvv, expiryMMYY, amount } = item._data;
          return(

            <Card cardNumber={cardNumber} cardholderName={cardholderName} cardCvv={cvv} cardExpiry={expiryMMYY} amount={amount}/>
            
          )
        }}/>

        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if(name.toLowerCase() == actions[0].name.toLowerCase()){
              setIsCardModalDisplay(true)
            }
          }}
          backgroundColor='black'
        />
        
      </View>
  
    );
  }
  
}