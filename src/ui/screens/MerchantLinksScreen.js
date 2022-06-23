import * as React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card, TextInput, Text } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'

export default MerchantHomeScreen = (props) => {

    const [successURL, setSuccessURL] = React.useState('');
    const [rejectURL, setRejectURL] = React.useState('');


    const user = props.route.params;

    React.useEffect(() => {

        if (successURL === '' || rejectURL === '') {

            if (user.links.successURL != '' && successURL === '') {
                setSuccessURL(user.links.successURL)
            }

            if (user.links.rejectURL != '' && rejectURL === '') {
                setRejectURL(user.links.rejectURL)
            }


        }


    })


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


    const onUpdateClick = () => {

        firestore()
            .collection('users')
            .doc(user.id)
            .update({
                'links.successURL': successURL,
                'links.rejectURL': rejectURL
            }).then(() => {
                props.navigation.goBack();
            })

    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

            <View style={{ marginVertical: 16, justifyContent: 'center', alignContent: 'center' }}>

                <Text style={{ margin: 16, fontSize: 22, color: 'black' }}>Reuest Return URLs to Catch Response</Text>

            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 8 }}>

                <TextInput value={successURL} onChangeText={t => setSuccessURL(t)} style={{ marginVertical: 8 }} placeholder='Success URL' />

                <TextInput value={rejectURL} onChangeText={t => setRejectURL(t)} style={{ marginVertical: 8 }} placeholder='Reject URL' />

            </View>


            <Button onPress={onUpdateClick} mode='contained' style={{ margin: 16 }}>
                Update Details
            </Button>

        </View>
    )
}