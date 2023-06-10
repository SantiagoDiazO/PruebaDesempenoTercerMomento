import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';
import Register from './Register.js';
import CustomerTabs from './CustomerTabs.js';
import ForgotPassword from './ForgotPassword.js';
import Rent from './Rent.js';

export default function Login({navigation}) {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  let rol = "admin"

  const login = async(data) =>{
    let username = data.username
    let password = data.password
    const user = {
      username,
      password
    }
    const response = await axios.post(`http://127.0.0.1:3500/api/login`, user)
    if(!response.data.error){
      if(response.data.role == "admin"){
        setMessage('')
        setIsError(false)
        reset()
        navigation.navigate(CustomerTabs)
      }else{
        setMessage('')
        setIsError(false)
        reset()
        navigation.navigate("Rent", username)
      }
    }else{
      setValue("firstName", "Error")
      setValue("lastName", "Error")
      setIsError(true)
      setMessage('El id del cliente NO Existe')
    }
  }

  const register = () =>{
    navigation.navigate(Register)
  }
  
  const forgotPassword = () =>{
    navigation.navigate(ForgotPassword)
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Inicio de Sesion</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Usuario"
            mode="outlined"
            style={{}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text style={{ color: 'red' }}>El usuario es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contraseña"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
        {errors.password && <Text style={{ color: 'red' }}>La contraseña es obligatorio</Text>}

        <Text style={{color: isError ? 'red' : 'verde'}}>{message}</Text>

      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          style={{backgroundColor:'blue'}}
          icon="login" 
          mode="contained" 
          onPress={handleSubmit(login)}>
          Iniciar Sesion
        </Button>
      </View>
      <View style={{marginTop:10, flexDirection:'row'}}>
        <Button 
          style={{borderColor:'white'}}
          mode="outlined" 
          onPress={register}>
          Registrarse
        </Button>
      </View>
      <View style={{marginTop:1, flexDirection:'row'}}>
        <Button 
          style={{borderColor:'white'}}
          mode="outlined" 
          onPress={forgotPassword}>
          ¿Olvidaste la contraseña?
        </Button>
      </View>
    </View>
  );
}