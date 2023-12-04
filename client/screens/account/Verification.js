import React, { useState, useContext } from 'react'
import { Alert, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { resetCodeValidator } from '../../helpers/resetCodeValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/authContext";



export default function Verification({ navigation }) {

  const [state, setState] = useContext(AuthContext);
  const { user, token } = state

  const [resetCode, setResetCode] = useState({ value: '', error: '' })

  const onContinuePressed = async () => {
    try {
      const resetCodeError = resetCodeValidator(resetCode.value)
      if (resetCodeError) {
        setResetCode({ ...resetCode, error: resetCodeError })
        return;
      }

      const newPassword = await AsyncStorage.getItem("@newpassword");
      const { data } = await axios.post("/auth/change-password-verification", {
        email: user?.email,
        resetCode: resetCode.value,
        newPassword: newPassword
      });
      Alert.alert(data && data.message);
      await AsyncStorage.removeItem("@newpassword");
      setState({ token: "", user: null });
      await AsyncStorage.removeItem("@auth");

      // Alert.alert('Your password has been reset successfully, please login!');


    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }


  const resendCode = async () => {
    try {

      const { data } = await axios.post("/auth/resend-code", {
        email: user?.email
      });

      console.log(axios.error);


      Alert.alert(data && data.message);
      setResetCode({ value: '', error: '' });



    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Verification</Header>
      <TextInput
        label="Verification Code"
        returnKeyType="done"
        value={resetCode.value}
        onChangeText={(text) => setResetCode({ value: text, error: '' })}
        error={!!resetCode.error}
        errorText={resetCode.error}
        autoCapitalize="none"
        textContentType="oneTimeCode"

      />


      <Button mode="contained" onPress={onContinuePressed}>
        Continue
      </Button>
      <Button
        mode="text"
        onPress={resendCode}
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Resend Code
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.replace('Account')}
        style={{
          marginTop: 0,
        }}
      >
        Back to My Account
      </Button>

    </Background>
  )
}


