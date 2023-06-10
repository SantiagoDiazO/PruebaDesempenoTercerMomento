import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPassword({navigation}) {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      username: '',
      reservword: '',
      newpassword: ''
    }
  });

  const onUpdate = async(data) => {
    let username = data.username;
    let reservword = data.reservword;
    let newpassword = data.newpassword;

    const user = {
      reservword,
      newpassword
    };
    const response = await axios.put(
      `http://127.0.0.1:3500/api/forgot/${username}`,
      user
    );
    console.log(response, "", user)
    setIsError(false);  
    setMessage("Contraseña actualizadas correctamente...");
    setTimeout(() => {
      setMessage("");
    }, 6000);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Recuperar contraseña</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Usuario"
            mode="outlined"
            style={{ marginTop: 10 }}
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
            label="Palabra reservada"
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
            label="Nueva contraseña"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="newpassword"
      />
        {errors.newpassword && <Text style={{ color: 'red' }}>La constraseña nueva es obligatoria</Text>}

        <Text style={{color: isError ? 'red' : 'verde'}}>{message}</Text>

      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="pencil-outline" 
          mode="contained" 
          onPress={handleSubmit(onUpdate)}>
          Cambiar contraseña
        </Button>
      </View>
    </View>
  );
}