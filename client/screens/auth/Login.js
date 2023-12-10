import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Text, IconButton } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Login = ({ navigation }) => {

  //global state
  const [state, setState] = useContext(AuthContext);

  // states
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkRemembered = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem('@rememberedEmail');
      const rememberedPassword = await AsyncStorage.getItem('@rememberedPassword');
      const checkbox = await AsyncStorage.getItem('@checkbox');
      if (checkbox === 'true' && rememberedEmail) {
        setEmail({ value: rememberedEmail, error: '' });
        setPassword({ value: rememberedPassword, error: '' });
        setIsChecked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //function
  // btn funcn
  const onLoginPressed = async () => {
    try {

      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return;
      }
      const emailValue = email.value;
      const passwordValue = password.value;
      const { data } = await axios.post("/auth/login", { email: emailValue, password: passwordValue });
      console.log(axios.error);
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      if (isChecked) {
        await AsyncStorage.setItem('@rememberedEmail', emailValue);
        await AsyncStorage.setItem('@rememberedPassword', passwordValue);
        await AsyncStorage.setItem('@checkbox', isChecked.toString());
      } else {
        await AsyncStorage.removeItem('@rememberedEmail');
        await AsyncStorage.removeItem('@rememberedPassword');
        await AsyncStorage.removeItem('@checkbox');
      }


      // Alert.alert(data && data.message);
      setEmail({ value: '', error: '' });
      setPassword({ value: '', error: '' });
      setShowPassword(false);
      navigation.navigate("Home");
      console.log("Login Data==> ", { emailValue, passwordValue });
    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
  };


  //temp function to check local storage data
  const getLocalStorageData = async () => {

    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==> ", data);
  };
  getLocalStorageData();
  useEffect(() => {
    checkRemembered();
  }, []);

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Chào mừng bạn!</Header>
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
          returnKeyType="done"
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

      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>

        <TouchableOpacity style={styles.rememberMe}
          onPress={() => { setIsChecked(!isChecked) }}
        >
          {isChecked && <MaterialIcons name="check-box" size={23} />}
          {!isChecked && <MaterialIcons name="check-box-outline-blank" size={23} />}
          <Text style={styles.remember}>Nhớ mật khẩu</Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>

      </View>

      <Button mode="contained" onPress={onLoginPressed}>
        Đăng nhập
      </Button>

      <Text style={{ fontWeight: '500', marginTop: 20 }}>Hoặc sử dụng</Text>
      <View style={{flexDirection: 'row', marginVertical: 10, width: '80%', justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={[styles.iconButton, {backgroundColor: '#f2391d'}]}>
          <FontAwesome5 name='google' size={20} color='white' />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.iconButton, {backgroundColor: '#1e309c'}]}          
          >
          <FontAwesome5 name='facebook-f' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    marginBottom: 24,

  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: '700',
  },
  rememberMe: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',

  },
  remember: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: '700',
    marginLeft: 3
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.third,
  },
  iconButton: {
    padding: 9,
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 30
  }
});


export default Login;
