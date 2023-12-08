import { Alert } from "react-native";
import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { emailValidator } from '../../helpers/emailValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ForgotPassword({ navigation }) {

  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = async () => {
    try {
      const emailError = emailValidator(email.value)
      if (emailError) {
        setEmail({ ...email, error: emailError })
        return
      }
  
      const { data } = await axios.post("/auth/forgot-password", {
        email: email.value
      });
  
      console.log(axios.error);
  
  
      Alert.alert(data && data.message);
      await AsyncStorage.removeItem("@email");
      await AsyncStorage.setItem("@email", email.value);
  
      setEmail({ value: '', error: '' });
  
      // Alert.alert("We've sent a 4 digits code to your email!")
      navigation.navigate('ResetPassword')

    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <Background>
      <BackButton goBack={() => navigation.replace('Login')} />
      <Logo />
      <Header>Quên mật khẩu?</Header>
      <TextInput
        label="Địa chỉ e-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Bạn sẽ nhận một email chứa mã xác thực để khôi phục tài khoản của mình."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Gửi email
      </Button>
    </Background>
  )
}
