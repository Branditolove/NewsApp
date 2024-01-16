import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import DetailScreen from './screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import RegisterScreen from './screens/Register';



export default function App() {
  const Stack = createStackNavigator();
  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} 
        options={{
          title: "Bienvenido",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: "#525FE1"}
        }}/>
        <Stack.Screen name='Home' options={{ title: 'Noticias' }} component={Home}/>
        <Stack.Screen name='Register' options={{ title: 'Registro' }}component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name='DetailScreen' options={{ title: 'Noticia Completa' }}component={DetailScreen}></Stack.Screen>
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mynewscard:{
      borderColor:'black',
      borderWidth:1,
      backgroundColor:'blue'
  }
});