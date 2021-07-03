import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { Firestore } from '../config/FirebaseSDK';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function AddRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');

  /**
   * Create a new Firestore collection to save threads
   */
   const handleButtonPress = async () => {
     if (roomName.length > 0) {
       try {
        let docRef = await Firestore.collection('THREADS')
          .add({
            name: roomName,
            latestMessage: {
              text: `You have joined the room ${roomName}.`,
              createdAt: new Date().getTime()
            }
          });

        await docRef.collection('MESSAGES').add({
          text: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          system: true
        });

        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />

      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName='Room Name'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  }
});
