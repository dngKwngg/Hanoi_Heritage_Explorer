import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { resetCodeValidator } from '../../helpers/resetCodeValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



export default function ResetPassword({ navigation }) {

  const [resetCode, setResetCode] = useState({ value: '', error: '' })
  const [newPassword, setNewPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const onResetPassPressed = async () => {
    try {
      const resetCodeError = resetCodeValidator(resetCode.value)
      const newPasswordError = passwordValidator(newPassword.value)
      const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, newPassword.value)
      if (resetCodeError || newPasswordError || confirmPasswordError) {
        setResetCode({ ...resetCode, error: resetCodeError })
        setNewPassword({ ...newPassword, error: newPasswordError })
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
        return;
      }

      const email = await AsyncStorage.getItem("@email");
      const { data } = await axios.post("/auth/resetpassword", {
        email: email,
        resetCode: resetCode.value,
        newPassword: newPassword.value,
      });
      Alert.alert(data && data.message);
      await AsyncStorage.removeItem("@email");

      // Alert.alert('Your password has been reset successfully, please login!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })

    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }


  const resendCode = async () => {
    try {

      const email = await AsyncStorage.getItem("@email");
      const { data } = await axios.post("/auth/forgotpassword", {
        email: email
      });

      console.log(axios.error);


      Alert.alert(data && data.message);



    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Reset Password</Header>
      <TextInput
        label="Verification Code"
        returnKeyType="next"
        value={resetCode.value}
        onChangeText={(text) => setResetCode({ value: text, error: '' })}
        error={!!resetCode.error}
        errorText={resetCode.error}
        autoCapitalize="none"
        textContentType="oneTimeCode"
      />
      <TextInput
        label="New Password"
        returnKeyType="next"
        value={newPassword.value}
        onChangeText={(text) => setNewPassword({ value: text, error: '' })}
        error={!!newPassword.error}
        errorText={newPassword.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onResetPassPressed}>
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
        onPress={() => navigation.replace('Login')}
        style={{
          marginTop: 0,
        }}
      >
        Back to Login
      </Button>

    </Background>
  )
}


