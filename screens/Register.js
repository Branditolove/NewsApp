import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import {initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/firebase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      console.log('Cuenta Creada')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  return (
    <View style={styles.main}>
      <View style={styles.target}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.target}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button title="Crear Cuenta" onPress={handleCreateAccount} />
    </View>
  );
};


export default RegisterScreen; 


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  target: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  boxtext: {
    paddingVertical: 20,
    backgroundColor: '#cccccc60',
    borderRadius: 30,
    marginVertical: 10,
  },
  Fatherbutton: {
    alignItems: 'center',
  },
  Boxbutton: {
    backgroundColor: '#525FE1',
    borderRadius: 60,
    marginVertical: 10,
    width: 200,
    marginTop: 20,
    paddingVertical: 10,
  },
  Textbutton: {
    textAlign: 'center',
    color: 'white',
  },
});
