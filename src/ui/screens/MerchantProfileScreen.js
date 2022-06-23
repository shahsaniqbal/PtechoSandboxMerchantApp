import * as React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, TextInput, Text, Avatar } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'

import Ant from 'react-native-vector-icons/AntDesign'
import { UserSchema } from '../../schemas/UserSchema';

export default MerchantHomeScreen = (props) => {

    const [user, setUser] = React.useState(new UserSchema());


    React.useEffect(() => {

        const tUser = props.route.params;


        if (!user.id) {
            setUser(tUser);

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
            .set(user)
            .then(() => {
                props.navigation.goBack();
            })
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

            <View style={{ marginTop: 16, justifyContent: 'center', alignContent: 'center' }}>

                <Text style={{ marginHorizontal: 16, marginVertical: 4, fontSize: 18, color: 'black', alignSelf: 'flex-start', fontWeight: 'bold' }}>Merchant Business Profile</Text>

            </View>

            <ScrollView>

                <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 8 }}>

                    <TextInput value={user.username} onChangeText={t => setUser({
                        ...user,
                        username: t
                    })} style={{ marginVertical: 8 }} placeholder='Username' />

                    <TextInput value={user.email} onChangeText={t => setUser({
                        ...user,
                        email: t
                    })} style={{ marginVertical: 8 }} placeholder='Email' />

                    <TextInput value={user.businessContact} onChangeText={t => setUser({
                        ...user,
                        businessContact: t
                    })} style={{ marginVertical: 8 }} placeholder='Contact' />

                    <TextInput value={user.businessName} onChangeText={t => setUser({
                        ...user,
                        businessName: t
                    })} style={{ marginVertical: 8 }} placeholder='Business Name' />

                    <TextInput value={user.businessLocation.line1} onChangeText={t => setUser({
                        ...user,
                        businessLocation: {
                            ...user.businessLocation,
                            line1: t
                        }
                    })} style={{ marginVertical: 8 }} placeholder='Address Line 1' />

                    <TextInput value={user.businessLocation.line2} onChangeText={t => setUser({
                        ...user,
                        businessLocation: {
                            ...user.businessLocation,
                            line2: t
                        }
                    })} style={{ marginVertical: 8 }} placeholder='Address Line 2' />

                    <TextInput value={user.businessLocation.area} onChangeText={t => setUser({
                        ...user,
                        businessLocation: {
                            ...user.businessLocation,
                            area: t
                        }
                    })} style={{ marginVertical: 8 }} placeholder='Area' />

                    <TextInput value={user.businessLocation.city} onChangeText={t => setUser({
                        ...user,
                        businessLocation: {
                            ...user.businessLocation,
                            city: t
                        }
                    })} style={{ marginVertical: 8 }} placeholder='City' />

                </View>

            </ScrollView>


            <Button onPress={onUpdateClick} mode='contained' style={{ margin: 16 }}>
                Update Details
            </Button>

        </View>
    )
}