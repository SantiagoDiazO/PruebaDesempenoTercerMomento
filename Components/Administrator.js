import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../assets/styles/styles.js";
import axios from "axios";
import { useState } from "react";

export default function Administrator({ navigation }) {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [idSearch, setIdsearch] = useState("");

  // configuración del formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      placa: "",
      marca: "",
      valorDia: "",
    },
  });

  const onSave = async (data) => {
    let platenumber = data.placa;
    let brand = data.marca;
    let dailyvalue = data.valorDia;

    const car = {
      platenumber,
      brand,
      dailyvalue,
    };
    const response = await axios.post(`http://127.0.0.1:3500/api/cars`, car);
    console.log(response.data);
    setIsError(false);
    setMessage("Carro agregado correctamente...");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    reset();
  };

  const onUpdate = async (data) => {
    let platenumber = data.placa;
    let brand = data.marca;
    let dailyvalue = data.valorDia;

    const car = {
      brand,
      dailyvalue,
    };
    const response = await axios.put(
      `http://127.0.0.1:3500/api/cars/${platenumber}`,
      car
    );
    setIsError(false);
    setMessage("Carro actualizado correctamente...");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    reset();
  };

  const onSearch = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3500/api/cars/${idSearch}`
    );
    if (!response.data.error) {
      setValue("placa", response.data.platenumber);
      setValue("marca", response.data.brand);
      setValue("valorDia", response.data.dailyvalue);
      setIsError(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setValue("placa", "Error");
      setValue("marca", "Error");
      setValue("valorDia", "Error");
      setMessage(response.data.error);
    }
  };

  const onDelete = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:3500/api/cars/${idSearch}`
    );
    if (!response.data.error) {
      setMessage("Auto eliminado correctamente");
      setIsError(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      reset();
    } else {
      setMessage(response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Agregar auto</Text>

      <TextInput
        style={{ marginTop: 5, marginBottom: 5 }}
        placeholder=""
        label="Placa del auto a buscar"
        mode="outlined"
        value={idSearch}
        onChangeText={(idSearch) => setIdsearch(idSearch)}
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Placa"
            mode="outlined"
            style={{}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="placa"
      />
      {errors.placa && (
        <Text style={{ color: "red" }}>La placa es obligatoria</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Marca"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="marca"
      />
      {errors.marca && (
        <Text style={{ color: "red" }}>La marca es obligatoria</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Costo por dia"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="valorDia"
      />
      {errors.valorDia && (
        <Text style={{ color: "red" }}>El valor por dia es obligatorio</Text>
      )}

      <Text style={{ color: isError ? "red" : "verde" }}>{message}</Text>

      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Button
          icon="content-save"
          mode="contained"
          onPress={handleSubmit(onSave)}
        >
          Guardar
        </Button>
        <Button
          style={{ backgroundColor: "orange", marginLeft: 10 }}
          icon="card-search-outline"
          mode="contained"
          onPress={onSearch}
        >
          Buscar
        </Button>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Button
          icon="pencil-outline"
          mode="contained"
          onPress={handleSubmit(onUpdate)}
        >
          Actualizar
        </Button>
        <Button
          style={{ backgroundColor: "red", marginLeft: 10 }}
          icon="delete-outline"
          mode="contained"
          onPress={handleSubmit(onDelete)}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
}
