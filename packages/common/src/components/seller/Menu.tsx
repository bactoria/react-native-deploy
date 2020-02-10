import React, {useContext, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { CustomStyle, CustomText } from "../../static/CustomStyle";
import MenuForm from './MenuForm'
import axios from 'axios'

const LocalStyles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2AC1BC',
    margin: 10,
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
  },
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  },
  menuButton: {
    flex: 1,
    marginTop: 5,
    paddingVertical: 3,
    borderRadius: 6,
  },
});

const styles = { ...CustomStyle, ...LocalStyles }

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
  isSoldOut: boolean
  handleUpdateMenu: any,
}

export default (props:IProps) => {

  const [isEditing, setIsEditing] = useState(false);
  
  const handleUpdateMenuSubmit = (requestDto, id) => {
    axios.put(`/menus/${id}`, requestDto)
      .then((res) => {
        const updatedMenu = res.data;
        props.handleUpdateMenu(updatedMenu);
        setIsEditing(false);
      })

  }

  const handleUpdateMenuCancel = () => {
    setIsEditing(false);
  }

  return (
    <View style={styles.menuContainer}>
      {isEditing
          ? <MenuForm id={props.id} name={props.name} price={props.price} content={props.content} imgURL={props.imgURL} isSoldOut={props.isSoldOut} handleMenuSubmit={handleUpdateMenuSubmit} handleMenuCancel={handleUpdateMenuCancel}></MenuForm>
          : <>

          <View style={{ alignSelf: 'center' }}>
            <Image
              defaultSource={{ uri: `https://picsum.photos/id/${props.id}/200` }}
              source={{ uri: props.imgURL }}
              style={{ width: 70, height: 70, borderRadius: 10 }}
            />
          </View>
    
          <View style={{ marginLeft: 15, flexShrink: 1, alignSelf: 'center', width:'100%' }}>
  
          <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[CustomText.title, { fontSize: 18 }]}>{props.name}</Text>
            <View style={{ marginHorizontal: 10, flexGrow: 1, alignSelf: 'center',  borderStyle: 'dotted', borderColor: '#000000', borderWidth: 1 }}></View>
            <Text style={[CustomText.title, { color: '#20a024', fontSize: 16 }]}>{props.price} 원</Text>
          </View>
          <View>
            <Text style={[CustomText.body]}>{props.content}</Text>
          </View>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#4177c9',}]} onPress={() => setIsEditing(true)}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>수정</Text></TouchableOpacity>
        </View>
        </View>
  
          </>
        }
        </View>
  );
  
};
