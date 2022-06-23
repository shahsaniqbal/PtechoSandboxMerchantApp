//import Exponent from 'exponent';
import React, { Component } from 'react';
import {

    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput

} from 'react-native';

import { Card as PaperCard } from 'react-native-paper'
import Card from 'react-native-credit-card-display'

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'


export default CardComponent = (props) => {
    const { cardNumber, cardholderName, cardCvv, cardExpiry, amount, currency } = props;
    const [flip, setFlip] = React.useState(false)
    const [loadAmount, setLoadAmount] = React.useState(0)

    const currencyPrefix = (currency) ? currency : "Rs. ";

    const onFlipButtonPress = () => {
        setFlip(!flip)
    }

    const onLoadButtonPress = () => {
        firestore()
        .collection('Cards')
        .doc(cardNumber)
        .update({
            "amount": firebase.firestore.FieldValue.increment(Number.parseInt(loadAmount)),
            "topups": firebase.firestore.FieldValue.arrayUnion({
                "amount": Number.parseInt(loadAmount),
                "date": Date.now.toString()
            })
        })
        setLoadAmount(0)
    }


    return (
        <View style={{ flex: 1 }}>
            <PaperCard style={{
                elevation: 2,
                margin: 2,
                padding: 8,
                borderRadius: 16
            }}>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',

                }}>
                    <Card number={cardNumber} name={cardholderName} cvc={cardCvv} expiration={cardExpiry} flipped={flip} />

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 2
                    }}>

                        <TextInput value={loadAmount} onChangeText={t=>setLoadAmount(t)} keyboardType='number-pad' style={{width: 64, fontSize:12, borderWidth:0.5, margin:4, borderRadius:8, padding:4, color:'purple', borderColor:'purple'}} placeholder='Amount' />

                        <TouchableOpacity onPress={onLoadButtonPress} style={styles.button}>
                            <Text style={styles.insideBtnText}>LOAD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onFlipButtonPress} style={styles.button}>
                            <Text style={styles.insideBtnText}>FLIP</Text>
                        </TouchableOpacity>

                        <Text style={styles.amountText}>{amount }</Text>
                        <Text style={{justifyContent:'center', alignItems:'center', textAlign:'center', textAlignVertical:'center', marginRight:4}}>{currencyPrefix}</Text>

                    </View>

                </View>



                {/*
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text>{cardNumber}</Text>
                    <Text>{cardholderName}</Text>
                    <Text>{cardCvv}</Text>
                    <Text>{cardExpiry}</Text>
                    <Text>{amount}</Text>


                </View>
        */}

            </PaperCard>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 2,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: 'purple',
        margin: 4,
        width:80,
        alignItems: 'center',
        alignItems:'center',
        justifyContent:'center'
    },
    insideBtnText: {
        color: 'white',
        textAlignVertical:'center',
        textAlign:'center',
        alignItems:'center'
    },
    amountText: {
        color: 'purple',
        fontSize: 18,
        alignSelf: 'center',
        margin: 8,
        fontFamily:'monospace'

    }
})