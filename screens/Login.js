import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log('Accedio')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <View style={styles.main}>
      <View>
        <Image source={require('../assets/1.png')} style={styles.profile}/>
      </View>
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

      <View style={styles.Fatherbutton}>
        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.Boxbutton}>
            <Text style={styles.Textbutton}>Entrar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.boxtext}>
        <Text onPress={() => navigation.navigate('Register')}>
          No tienes cuenta? Regístrate aquí
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  profile:{
    width:200,
    height:200,
    borderRadius:50,
    borderColor:'white'
  },
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
