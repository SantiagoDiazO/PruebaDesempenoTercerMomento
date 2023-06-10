import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Components/Register';
import Login from './Components/Login';
import CustomerTabs from './Components/CustomerTabs';
import ForgotPassword from './Components/ForgotPassword';
import Administrator from './Components/Administrator';
import Rent from './Components/Rent';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer initialRouteName='Login'>
      <Stack.Navigator>
        <Stack.Screen name = 'Login' component={Login} options={{title: 'Sistema de Renta'}}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='CustomerTabs' component={CustomerTabs}/>
        <Stack.Screen name='Administrator' component={Administrator}/>
        <Stack.Screen name='Rent' component={Rent}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}