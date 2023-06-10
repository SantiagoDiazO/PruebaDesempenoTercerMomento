import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import Return from "./Return";
import Administrator from "./Administrator";

const Tab = createBottomTabNavigator()

export default function CustomerTabs({navigation}){

    return(
        <Tab.Navigator screenOptions={{
            headerShown: false
            }}>

            <Tab.Screen name="Car" component={Administrator} options={{
                title: "Crear auto",
                tabBarIcon: () => (<MaterialIcons name="car-rental" color="red" size={25}/>)
            }}/>

            <Tab.Screen name="ReturnCar" component={Return} options={{
                title: "Devolver auto",
                tabBarIcon: () => (<MaterialIcons name="car-repair" color="orange" size={25}/>)
            }}/>
        </Tab.Navigator>
    )
}