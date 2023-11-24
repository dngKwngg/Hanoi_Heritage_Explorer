import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { resetCodeValidator } from '../helpers/resetCodeValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function ResetPassword({ navigation }) {
  const [resetCode, setResetCode] = useState({ value: '', error: '' })
  const [newPassword, setNewPassword] = useState({ value: '', error: '' })

  const onResetPassPressed = () => {
    const resetCodeError = resetCodeValidator(resetCode.value)
    const newPasswordError = passwordValidator(newPassword.value)
    if (resetCodeError || newPasswordError) {
      setResetCode({ ...resetCode, error: resetCodeError })
      setNewPassword({ ...newPassword, error: newPasswordError })
      return;
    }
    alert('Your password has been reset successfully, please login!');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset Password</Header>
      <TextInput
        label="Four digits code"
        returnKeyType="next"
        value={resetCode.value}
        onChangeText={(text) => setResetCode({ value: text, error: '' })}
        error={!!resetCode.error}
        errorText={resetCode.error}
        autoCapitalize="none"
        textContentType="oneTimeCode"
        keyboardType="numeric"
      />
      <TextInput
        label="New password"
        returnKeyType="done"
        value={newPassword.value}
        onChangeText={(text) => setNewPassword({ value: text, error: '' })}
        error={!!newPassword.error}
        errorText={newPassword.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onResetPassPressed}>
        Continue
      </Button>

    </Background>
  )
}


