import * as React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card, TextInput, Text, Avatar } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'

import Ant from 'react-native-vector-icons/AntDesign'
import { UserSchema } from '../../schemas/UserSchema';

const CardComponent = (props) => {
    return (

        <TouchableOpacity onPress={props.onPress}>
            <Card style={{ elevation: 4, borderRadius: 8, borderWidth: 1, height: 120, width: 100, alignItems: 'center', justifyContent: 'center', margin: 8 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                    <Icon name={props.icon} size={30} color='black' style={{ margin: 4 }} />

                    <Text style={{ margin: 4 }}>{props.title}</Text>
                </View>

            </Card>

        </TouchableOpacity>

    )
}

export default MerchantHomeScreen = (props) => {

    const [user, setUser] = React.useState(new UserSchema());

    React.useEffect(()=>{
        firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .onSnapshot(res=>{
            setUser(res._data)
        })
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

    const onCardsClick = () => {
        props.navigation.navigate('Cards')
    }

    const onLinksClick = () => {
        props.navigation.navigate('Links', user)
    }

    const onProfileClick = () => {
        props.navigation.navigate('Profile', user)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

            <View style={{marginVertical: 16, justifyContent:'center', alignContent:'center'}}>

                <Text style={{textAlign:'center', fontSize: 32, color:'purple'}}>Hello,</Text>

                <Text style={{textAlign:'center', fontSize: 28, color:'blue'}}>{user.username}</Text>

            </View>


            <Text style={{textAlign:'center', fontSize: 16, color:'black'}}>{"Merchant ID"}</Text>

            <Text style={{textAlign:'center', fontSize: 14, color:'black', fontWeight:'bold'}}>{user.id}</Text>

            <Text style={{textAlign:'center', fontSize: 12, color:'black', marginBottom:8}}>{'Use this ID String to Request on\nhttps://sandboxpay.api.ptecho.com'}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <CardComponent title='Cards' icon='credit-card' onPress={onCardsClick} />

                <CardComponent title='Links' icon='unlink' onPress={onLinksClick} />

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <CardComponent title='Profile' icon='user-secret' onPress={onProfileClick} />

                <TouchableOpacity onPress={onLogout}>
                    <Card style={{ elevation: 4, borderRadius: 8, borderWidth: 1, height: 120, width: 100, alignItems: 'center', justifyContent: 'center', margin: 8 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                            <Ant name={'logout'} size={30} color='black' style={{ margin: 4 }} />

                            <Text style={{ margin: 4 }}>Logout</Text>
                        </View>

                    </Card>

                </TouchableOpacity>

            </View>

        </View>
    )
}