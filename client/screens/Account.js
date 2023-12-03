import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import BackButton from "../components/BackButton";
import TextInput from '../components/TextInput'
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../constants/colors";
import { theme } from "../core/theme";
import Button from "../components/Button";

const Account = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  //local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(user?.dateOfBirth).toDateString());
  const [email] = useState(user?.email);

  const [date, setDate] = useState(new Date(user?.dateOfBirth));
  const [showPicker, setShowPicker] = useState(false);




  //handle update user data
  const handleUpdate = async () => {
    try {
   
      const { data } = await axios.put("/auth/update-user-profile", {
        name: name,
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
          {name}
        </Text>

        <Text style={styles.subsectionTitle}>Profile</Text>
        <View style={styles.profileContainer}>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Name</Text>
            <View style={styles.iconContainer}>

              <TextInput
                style={styles.inputBox}
                returnKeyType="next"
                value={name}
                mode='flat'
                onChangeText={(text) => setName(text)}
                autoCapitalize="none"
                activeUnderlineColor={theme.colors.fifth}
                underlineColor='black'
              />
              <FontAwesome5
                name="pencil-alt" size={18}
                style={{ position: 'absolute', right: '5%', top: '35%' }}
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
            <Text style={styles.inputText}>Date of Birth</Text>

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
                underlineColor='gray'
                editable={false}
            
              />

              <FontAwesome5
                name="calendar-alt" size={20}
                style={{ position: 'absolute', right: '5%', top: '33%' }}
              />
            </TouchableOpacity>

          </View>

          

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Button style={styles.updateBtn} mode="contained" onPress={handleUpdate} >Update Profile</Button>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

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
    borderRadius: 18

  },
  inputContainer: {

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    paddingHorizontal: 5
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: '100%',
    height: 45,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  iconContainer: {
    width: '100%'
  },
  updateBtn: {
    backgroundColor: "green",
    width: '50%',
  },
});
export default Account;
