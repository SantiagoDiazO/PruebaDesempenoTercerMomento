import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      user: '',
      password: ''
    }
  });

  const onSearch = async() =>{
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
    //console.log(response.data)
    if(!response.data.error){
      setValue("firstName", response.data.nombre)
      setValue("lastName", response.data.apellidos)
      setMessage('')
      setIsError(false)
    }else{
      setValue("firstName", "Error")
      setValue("lastName", "Error")
      setIsError(true)
      setMessage('El id del cliente NO Existe')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Inicio de Sesion</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Usuario"
            mode="outlined"
            style={{ backgroundColor: 'powderblue' }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="user"
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
          style={{backgroundColor:'blue',marginLeft:10}}
          icon="login" 
          mode="contained" 
          onPress={handleSubmit(onSearch)}>
          Iniciar Sesion
        </Button>
      </View>
    </View>
  );
}