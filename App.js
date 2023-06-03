import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTabs from './Components/HomeTabs';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component={HomeTabs} options={{title: 'Sistema de Renta'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}