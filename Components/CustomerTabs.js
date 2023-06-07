import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons'
import Rent from "./Rent";
import Return from "./Return";

const Tab = createBottomTabNavigator()

export default function CustomerTabs({navigation}){

    return(
        <Tab.Navigator screenOptions={{
            headerShown: false
            }}>

            {/* <Tab.Screen name="Usuarios" component={Login} options={{
                title:"Usuarios", 
                tabBarIcon: () => (<MaterialIcons name="person" color="blue" size={25}/>)
            }}/> */}

            <Tab.Screen name="RentCar" component={Rent} options={{
                title: "Rentar auto",
                tabBarIcon: () => (<MaterialIcons name="car-rental" color="red" size={25}/>)
            }}/>

            <Tab.Screen name="ReturnCar" component={Return} options={{
                title: "Devolver auto",
                tabBarIcon: () => (<MaterialIcons name="car-repair" color="orange" size={25}/>)
            }}/>
        </Tab.Navigator>
    )
}