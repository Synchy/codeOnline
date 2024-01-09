import React, { useState, useContext } from "react";
import { SIGN_IN_QUERY } from "../../../graphql/queries/SIGN_IN_QUERY";
import { useLazyQuery } from "@apollo/client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Text, View, Image, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authContext } from "../../../utils/context/AuthContext";

interface IuserSignIn {
  email: string;
  password: string;
}

const FormSignIn = ({ navigation }) => {
  const [credentials, setCredentials] = useState(false);
  const [signIn, { loading }] = useLazyQuery(SIGN_IN_QUERY);
  const { setIsAuth } = useContext(authContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserSignIn>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<IuserSignIn> = async (data) => {
    try {
      const result = await signIn({
        variables: data,
      });
      console.log(result);
      const token = result.data.signIn;
      await AsyncStorage.setItem("token", token);
      setIsAuth(true);
      setCredentials(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      setCredentials(true);
      setIsAuth(false);
    }
  };

  return (
    <View>
      <Text>Connectez-vous</Text>
      <Text>Bonjour ! Renseigner vos coordonnées pour vous connecter</Text>
      {credentials ? (
        <View>
          <Text>l'email ou le mot de passe n'est pas valide</Text>
        </View>
      ) : null}

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              id="email"
              placeholder="Email*"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: true,
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Format d'email invalide",
            },
          }}
        />

        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <Text> {message}</Text>}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              id="password"
              placeholder="Mot de passe*"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              message:
                "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
            },
          }}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <Text> {message}</Text>}
        />
        <Button
          title="Se connecter"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </View>
      <Text>
        Pas encore de compte ?{" "}
        <Text onPress={() => navigation.navigate("File")}>
          Inscrivez-vous !
        </Text>
      </Text>
    </View>
  );
};

export default FormSignIn;
