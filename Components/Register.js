import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';

export default function Register({navigation}) {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      username: '',
      name: '',
      role: '',
      reservword: '',
      password: ''
    }
  });

  const register = async(data) =>{
    let username = data.username
    let name = data.name
    let role = data.role
    let reservword = data.reservword
    let password = data.password

    const user = {
      username,
      name,
      role,
      reservword,
      password
    }
    const response = await axios.post(`http://127.0.0.1:3500/api/users`, user)
    setIsError(false)
    setMessage("Cliente agregado correctamente...")
    setTimeout(() => {
        setMessage("")
    }, 2000)
    reset()
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Registrarse</Text>
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
            label="Nombre"
            mode="outlined"
            style={{marginTop: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Rol"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="role"
      />
        {errors.role && <Text style={{ color: 'red' }}>El rol es obligatorio</Text>}
      
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Palabra Reservada"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="reservword"
      />
        {errors.reservword && <Text style={{ color: 'red' }}>La palabra reservada es obligatoria</Text>}

        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contrasena"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
        {errors.password && <Text style={{ color: 'red' }}>La contrasena es obligatoria</Text>}

        <Text style={{color: isError ? 'red' : 'verde'}}>{message}</Text>

      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="content-save" 
          mode="contained" 
          onPress={handleSubmit(register)}>
          Registrarse
        </Button>
      </View>
    </View>
  );
}