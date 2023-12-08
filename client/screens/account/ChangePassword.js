import React, { useState, useContext } from 'react'
import { Alert, View, TouchableOpacity } from 'react-native'
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
import { AuthContext } from "../../context/authContext";



export default function ChangePassword({ navigation }) {

  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  const [password, setPassword] = useState({ value: '', error: '' })
  const [newPassword, setNewPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChangePassPressed = async () => {
    try {
      const passwordError = passwordValidator(password.value)
      let newPasswordError = passwordValidator(newPassword.value)
      const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, newPassword.value)
      if (newPassword.value === password.value) {
        newPasswordError = 'Mật khẩu mới và mật khẩu hiện tại không thể giống nhau.'
      }
      if (passwordError || newPasswordError || confirmPasswordError) {
        setPassword({ ...password, error: passwordError })
        setNewPassword({ ...newPassword, error: newPasswordError })
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
        return;
      }


      const { data } = await axios.post("/auth/change-password", {
        email: user?.email,
        currentPassword: password.value,
        newPassword: newPassword.value,
      });
      Alert.alert(data && data.message);

      await AsyncStorage.removeItem("@newpassword");
      await AsyncStorage.setItem("@newpassword", newPassword.value);

      setPassword({ value: '', error: '' });
      setNewPassword({ value: '', error: '' });
      setConfirmPassword({ value: '', error: '' });
      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      // Alert.alert('Your password has been reset successfully, please login!');
      navigation.navigate('Verification');

    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  const onForgotPressed = async () => {
    try {

      const { data } = await axios.post("/auth/forgot-password", {
        email: user?.email
      });

      console.log(axios.error);


      Alert.alert(data && data.message);
      setPassword({ value: '', error: '' });
      setNewPassword({ value: '', error: '' });
      setConfirmPassword({ value: '', error: '' });
      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    
      // Alert.alert("We've sent a 4 digits code to your email!")
      navigation.navigate('ResetPassWithoutBacktoLogin')

    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (

    <Background>

      <BackButton goBack={navigation.goBack} />

      <Logo />
      <Header>Đổi mật khẩu</Header>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          label="Mật khẩu hiện tại"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
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
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          label="Mật khẩu mới"
          returnKeyType="next"
          value={newPassword.value}
          onChangeText={(text) => setNewPassword({ value: text, error: '' })}
          error={!!newPassword.error}
          errorText={newPassword.error}
          secureTextEntry={!showNewPassword}
          style={{ width: '100%' }}
        />
        <MaterialCommunityIcons
          name={showNewPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={{ position: 'absolute', right: 9, top: 32 }}
          onPress={toggleShowNewPassword}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
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
      <View style={{
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      }}>
        <TouchableOpacity
          onPress={onForgotPressed}
        >
          <Text style={{
            fontSize: 13,
            color: theme.colors.secondary,
            fontWeight: '700'
          }}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onChangePassPressed}>
        Tiếp tục
      </Button>


    </Background>



  )
}


