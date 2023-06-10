import { Text, View, ActivityIndicator, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../assets/styles/styles.js";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Return() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [idSearch, setIdsearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // configuración del formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      fechaDevolucion: "",
    },
  });

  const onUpdate = async (data) => {
    let rentnumber = selectedValue;
    let returnDate = data.fechaDevolucion;

    const rentreturn = {
      rentnumber,
      returnDate,
    };
    const response = await axios.post(
      `http://127.0.0.1:3500/api/returns`,
      rentreturn
    );
    setIsError(false);
    setMessage("Devolucion hecha correctamente...");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    reset();
  };

  useEffect(() => {
    async function onSearch() {
      const rentList = await axios.get(`http://127.0.0.1:3500/api/rents`);
      setOptions(rentList.data);
      setIsLoading(false);
    }
    onSearch().catch(console.error);
  }, []);

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Devolver auto</Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.dropdown}
      >
        <Picker.Item />

        {options.map((option) => (
          <Picker.Item
            key={option._id}
            label={option.rentnumber}
            value={option.rentnumber}
          />
        ))}
      </Picker>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Fecha devolucion"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            placeholder="yyyy/mm/dd"
            maxLength={10}
          />
        )}
        name="fechaDevolucion"
      />
      {errors.fechaDevolucion && (
        <Text style={{ color: "red" }}>La fecha es obligatoria</Text>
      )}

      <Text style={{ color: isError ? "red" : "verde" }}>{message}</Text>

      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Button
          icon="pencil-outline"
          mode="contained"
          onPress={handleSubmit(onUpdate)}
        >
          Actualizar
        </Button>
      </View>
    </View>
  );
}
