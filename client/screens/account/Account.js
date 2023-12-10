import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import FooterMenu from "../../components/Menus/FooterMenu";
import axios from "axios";
import BackButton from "../../components/BackButton";
import TextInput from '../../components/TextInput'
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../constants/colors";
import { theme } from "../../core/theme";
import Button from "../../components/Button";
import { nameValidator } from '../../helpers/nameValidator'

const Account = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  //local state
  const [name, setName] = useState({ value: user?.name, error: '' });
  const [password, setPassword] = useState(user?.password);
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ? new Date(user?.dateOfBirth).toDateString() : 'Not yet provided');
  const [email] = useState(user?.email);

  const [date, setDate] = useState(user?.dateOfBirth ? new Date(user?.dateOfBirth) : new Date());
  const [showPicker, setShowPicker] = useState(false);




  //handle update user data
  const handleUpdate = async () => {
    try {
      const nameError = nameValidator(name.value)
      if (nameError) {
        setName({ ...name, error: nameError })
        return;
      }

      const { data } = await axios.put("/auth/update-user-profile", {
        name: name.value,
        email: email,
        dateOfBirth: new Date(dateOfBirth)
      });


      state.user = data.updatedUser;


      Alert.alert(data && data.message);
    } catch (error) {
      Alert.alert(error.response.data.message);

      console.log(error);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onSetDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      togglePicker();
      setDateOfBirth(currentDate.toDateString());

    } else {
      togglePicker();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/pastel-background13.jpg')} style={styles.bg}>
        <View
          style={{
            marginHorizontal: 17,

          }}
        >
          <BackButton goBack={navigation.goBack} />

        </View>
        <ScrollView style={{ marginTop: 70 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
              }}
              style={{ height: 200, width: 200, borderRadius: 100 }}
            />
          </View>
          <Text style={styles.name}>
            {name.value}
          </Text>

          <Text style={styles.subsectionTitle}>Thông tin</Text>
          <View style={styles.profileContainer}>

            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Họ tên</Text>
              <View style={styles.iconContainer}>

                <TextInput
                  style={styles.inputBox}
                  returnKeyType="next"
                  value={name.value}
                  mode='flat'
                  onChangeText={(text) => setName({ value: text, error: '' })}
                  error={!!name.error}
                  errorText={name.error}
                  autoCapitalize="none"
                  activeUnderlineColor={theme.colors.fifth}
                  underlineColor='black'
                />
                <FontAwesome5
                  name="pencil-alt" size={18}
                  style={{ position: 'absolute', right: 9, top: 27 }}
                />
              </View>
            </View>





            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Email</Text>
              <TextInput
                style={styles.inputBox}
                returnKeyType="next"
                value={email}
                mode='flat'
                disabled
              />
            </View>
            <View style={styles.inputContainer}>
        

              <Text style={[styles.inputText]}>Ngày sinh</Text>
            

              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onSetDate}
                />
              )}


              <TouchableOpacity style={styles.iconContainer} onPress={togglePicker}>
                <TextInput
                  style={styles.inputBox}
                  returnKeyType="done"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  mode='flat'
                  underlineColor='black'
                  editable={false}

                />

                <FontAwesome5
                  name="calendar-alt" size={20}
                  style={{ position: 'absolute', right: 9, top: 25 }}
                />
              </TouchableOpacity>

            </View>



            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Button style={styles.updateBtn} mode="contained" onPress={handleUpdate} >Cập nhật hồ sơ</Button>
            </View>
          </View>

          <Text style={styles.subsectionTitle}>Mật khẩu</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 25,
              paddingLeft: 35,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 18,
              borderStyle: 'solid',
              borderColor: COLORS.border_gray,
              borderWidth: 1
            }}
          >
            <FontAwesome5
              name='unlock-alt' size={25}
            />

            <Text
              style={{
                marginLeft: 30,
                fontWeight: 500,
                fontSize: 18,

              }}
            >
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: '#fcf8eb'
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',

  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: "center",

  },
  subsectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.dark,
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 10
  },
  profileContainer: {

    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 18,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1
  },
  inputContainer: {

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    paddingHorizontal: 4
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    fontSize: 15,
    color: "gray",
  },
  inputBox: {
    marginLeft: 3,
    height: 45,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  iconContainer: {
    width: '100%'
  },
  updateBtn: {
    backgroundColor: theme.colors.third,
    width: '50%',
  },
  changePassBox: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1
  }
});
export default Account;
