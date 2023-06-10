import { Text, View, Picker, ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../assets/styles/styles.js";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Rent({ navigation, route }) {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [idSearch, setIdsearch] = useState("");
  const [listCars, setListCars] = useState();
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
      placa: "",
      fechaInicio: "",
      fechaFinal: "",
    },
  });

  useEffect(() => {
    async function onSearch() {
      const listCars = await axios.get(`http://127.0.0.1:3500/api/cars`);
      setOptions(listCars.data);
      setIsLoading(false);
    }
    onSearch().catch(console.error);
  }, []);

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  const onSave = async (data) => {
    if (!selectedValue) {
      console.log("El Picker está vacío");
    } else {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const formattedDate = `${year}/${month}/${day}`;

      const formattedDateObj = new Date(formattedDate);

      //
      const fechaInicialInput = new Date(data.fechaInicio);
      const day2 = fechaInicialInput.getDate();
      const month2 = fechaInicialInput.getMonth() + 1;
      const year2 = fechaInicialInput.getFullYear();

      const formattedDate2 = `${year2}/${month2}/${day2}`;

      const formattedDateObj2 = new Date(formattedDate2);

      if (formattedDateObj2 >= formattedDateObj) {
        const fechaFinalInput = new Date(data.fechaFinal);
        const day3 = fechaFinalInput.getDate();
        const month3 = fechaFinalInput.getMonth() + 1;
        const year3 = fechaFinalInput.getFullYear();

        const formattedDate3 = `${year3}/${month3}/${day3}`;

        const formattedDateObj3 = new Date(formattedDate3);

        if (formattedDateObj3 >= formattedDateObj2) {
          let username = route.params;
          let platenumber = selectedValue;
          let initialDate = data.fechaInicio;
          let finalDate = data.fechaFinal;

          const car = {
            username,
            platenumber,
            initialDate,
            finalDate,
          };
          const response = await axios.post(
            `http://127.0.0.1:3500/api/rents`,
            car
          );
          if(!response.data.error){
            setIsError(false);
            setMessage("Renta agregada correctamente...");
            setTimeout(() => {
              setMessage("");
            }, 3500);
            reset();
          }else{
            setIsError(true);
            setMessage(response.data.error);
            setTimeout(() => {
              setMessage("");
            }, 3500);
          }
        } else {
          setIsError(true);
          setMessage("La fecha final es menor a la fecha inicial");
          setTimeout(() => {
            setMessage("");
          }, 3500);
        }
      } else {
        setIsError(true);
        setMessage("La fecha inicial es menor a la fecha actual");
        setTimeout(() => {
          setMessage("");
        }, 3500);
      }
    }
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
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Rentar Auto</Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.dropdown}
      >
        <Picker.Item />

        {options.map((option) => (
          <Picker.Item
            key={option._id}
            label={option.platenumber}
            value={option.platenumber}
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
            label="Fecha inicio"
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
        name="fechaInicio"
      />
      {errors.fechaInicio && (
        <Text style={{ color: "red" }}>La fecha de inicio es obligatoria</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Fecha final"
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
        name="fechaFinal"
      />
      {errors.fechaFinal && (
        <Text style={{ color: "red" }}>La fecha final es obligatoria</Text>
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
      </View>
    </View>
  );
}
