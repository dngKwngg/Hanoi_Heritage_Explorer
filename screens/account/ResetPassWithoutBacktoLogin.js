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
import { passwordValidator } from '../../helpers/passwordValidator'
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/authContext";



export default function ResetPassWithoutBacktoLogin({ navigation }) {
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;

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

            const { data } = await axios.post("/auth/reset-password", {
                email: user?.email,
                resetCode: resetCode.value,
                newPassword: newPassword.value,
            });
            Alert.alert(data && data.message);

            setState({ token: "", user: null });
            await AsyncStorage.removeItem("@auth");

        } catch (error) {
            Alert.alert(error.response.data.message);
            console.log(error);
        }
    }


    const resendCode = async () => {
        try {


            const { data } = await axios.post("/auth/forgot-password", {
                email: user?.email
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
            <BackButton goBack={navigation.goBack} />
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
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    label="New Password"
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

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    label="Confirm Password"
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



        </Background>
    )
}


