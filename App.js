import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTabs from './Components/HomeTabs';
import Register from './Components/Register';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer initialRouteName='Home'>
      <Stack.Navigator>
        <Stack.Screen name = 'Home' component={HomeTabs} options={{title: 'Sistema de Renta'}}/>
        <Stack.Screen name='Register' component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}