import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';
import Register from './Register.js';

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

  const onSearch = async() =>{
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
    //console.log(response.data)
    if(!response.data.error){
      setIsError(false)
      setMessage('')
    }else{
      setIsError(true)
      setMessage('El id del cliente NO Existe')
    }
  }

  const register = () =>{
    navigation.navigate(Register)
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
            style={{  }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.user && <Text style={{ color: 'red' }}>El usuario es obligatorio</Text>}

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
          onPress={handleSubmit(onSearch)}>
          Iniciar Sesion
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          style={{borderColor:'white'}}
          mode="outlined" 
          onPress={register}>
          Registrarse
        </Button>
      </View>
    </View>
  );
}