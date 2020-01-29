import React, { Component, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import axios from 'axios';
import { observer } from "mobx-react-lite";
import { mainStoreContext } from "../../store/MainStore";
import { loginStoreContext } from "../../store/LoginStore";
import { CustomStyle } from "../../static/CustomStyle";
import { Colors } from "../../static/CustomColor";

export const NewLoginForm: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext);

  const handleEmail = (email: string) => {
    loginStore.userEmail = email;
  };

  // security handling required.
  const handlePassword = (pass: string) => {
    loginStore.pass = pass;
  }

  const handleLogin = (email: string, pass: string) => {
    axios({
      url: loginStore.proxy + '/users/login/',
      method: 'post',
      data: {
        userEmail: loginStore.userEmail,
        userPassword: loginStore.pass
      }
    }).then((response) => {
      console.log(response);
      // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
      loginStore.responsedata = response.data

      // session 로컬 스토리지에 저장하기
      localStorage.setItem(
        "userInfo",
        loginStore.responsedata
      )

      // if success 추가해야됨
      if (true) {
        mainStore.isLoggedIn = true;
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <View style={[styles.inputContainer]}>
        <Text style={LocalStyles.caption}>이메일</Text>
        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleEmail}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <Text style={LocalStyles.caption}>비밀번호</Text>
        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handlePassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.buttons, LocalStyles.form]}
          onPress={() => handleLogin(loginStore.userEmail, loginStore.pass)}
        >
          <Text style={{ color: Colors.white }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  )
})

const LocalStyles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center'
  },
  caption: {
    width: '80%',
    color: '#a0a0a0',
    alignSelf: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginLeft: 10
  }
});

const styles = { ...CustomStyle, ...LocalStyles }