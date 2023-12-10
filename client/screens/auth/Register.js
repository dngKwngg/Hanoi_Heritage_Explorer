import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/authContext";
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator'
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  // const [state, setState] = useContext(AuthContext);
  // states
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  //function
  // btn funcn
  const onSignUpPressed = async () => {
    try {
      const nameError = nameValidator(name.value)
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value)
      if (emailError || passwordError || nameError || confirmPasswordError) {
        setName({ ...name, error: nameError })
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
        return;

      }

      const emailValue = email.value;
      const passwordValue = password.value;
      const nameValue = name.value;
      const { data } = await axios.post("/auth/register", {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });
      // setState(data);
      // await AsyncStorage.setItem("@auth", JSON.stringify(data));
      Alert.alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==> ", { nameValue, emailValue, passwordValue });
    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Tạo tài khoản</Header>
      <TextInput
        label="Họ tên"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          label="Mật khẩu"
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Đăng ký
      </Button>
      <View style={styles.row}>
        <Text>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.third,
  },
})

export default Register;
