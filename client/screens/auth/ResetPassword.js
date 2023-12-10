import React, { useState } from 'react'
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
import { passwordValidator } from '../../helpers/passwordValidator'
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function ResetPassword({ navigation }) {

  const [resetCode, setResetCode] = useState({ value: '', error: '' })
  const [newPassword, setNewPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
      const { data } = await axios.post("/auth/reset-password", {
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
      const { data } = await axios.post("/auth/forgot-password", {
        email: email
      });

      console.log(axios.error);


      Alert.alert(data && data.message);
      setResetCode({ value: '', error: '' });
      setNewPassword({ value: '', error: '' });
      setConfirmPassword({ value: '', error: '' });
      setShowPassword(false);
      setShowConfirmPassword(false);


    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Đặt lại mật khẩu</Header>
      <TextInput
        label="Mã xác thực"
        returnKeyType="next"
        value={resetCode.value}
        onChangeText={(text) => setResetCode({ value: text, error: '' })}
        error={!!resetCode.error}
        errorText={resetCode.error}
        autoCapitalize="none"
        textContentType="oneTimeCode"
 
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          label="Mật khẩu mới"
          returnKeyType="next"
          value={newPassword.value}
          onChangeText={(text) => setNewPassword({ value: text, error: '' })}
          error={!!newPassword.error}
          errorText={newPassword.error}
          secureTextEntry={!showPassword}
          style={{ width: '100%' }}
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={{ position: 'absolute', right: 9, top: 32 }}
          onPress={toggleShowPassword}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <TextInput
          label="Gõ lại mật khẩu"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry={!showConfirmPassword}
          style={{ width: '100%' }}
        />
        <MaterialCommunityIcons
          name={showConfirmPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={{ position: 'absolute', right: 9, top: 32 }}
          onPress={toggleShowConfirmPassword}
        />
      </View>

      <Button mode="contained" onPress={onResetPassPressed}>
        Tiếp tục
      </Button>
      <Button
        mode="text"
        onPress={resendCode}
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Gửi lại mã
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.replace('Login')}
        style={{
          marginTop: 0,
        }}
      >
        Quay lại Đăng nhập
      </Button>

    </Background>
  )
}


