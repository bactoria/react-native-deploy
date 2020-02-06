import React, { useEffect, useState, useContext } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import MenuList from './MenuList';
import Line from '../Line'
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import ReviewList from './ReviewList';

interface IState {
  id: Number,
  imgURL?: string,
  title: string,
  contents: string,
  menus: []
}

interface IReview {
  id: number,
  content: string,
  startRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string
}

interface Props {
  targetId: number
}

export const TruckDetailwithId: React.FC<Props> = ({targetId}) => {
  const mainStore = useContext(mainStoreContext)
  const [data, setData] = useState<IState>({
    id: 0, imgURL: '', title: '', contents: '', menus: []
  })
  const [review, setReview] = useState<IReview[]>([{
    id: 0, content: '', startRating: 1, createdAt: '', updatedAt: '', truckId: 0, userEmail: ''
  }])


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/trucks/${targetId}`,
      );
      console.log(JSON.stringify(result.data));
      setData(result.data)
    };
    const fetchReview = async () => {
      const result = await axios(`/reviews/all/${targetId}`,
      );
      console.log(JSON.stringify(result.data))
      setReview(result.data)
    }
    fetchData();
    fetchReview();
  }, []);

  return (
    <View style={styles.container}>
      <Image
          style={{ width: '100%', height: 150, marginBottom: -30 }}
          source={{ uri: data.imgURL ? data.imgURL : '' }}
          defaultSource={{uri: `https://picsum.photos/id/${data.id ? data.id : 0}/200`}}
      />
      <View style={{paddingBottom: 10, backgroundColor: '#edaa11', width: '70%',  alignSelf: 'center', borderRadius: 9, marginBottom: 5}}>
        <View style={{ width: '100%', backgroundColor: '#f2be46', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 9, alignItems: 'center'}}>
          <Text style={[styles.titleHN, {fontSize: 24}]}>{data.title}</Text>
        </View>
      </View>
      <View style={styles.truckContentsContainer}>
        <Text style={[CustomText.italic, CustomText.body, CustomText.textCenter, {fontSize: 16}]}>{data.contents}</Text>
      </View>

      <MenuList menulist={data.menus} />
      <Line></Line>
      <ReviewList reviewList={review} />
    </View>
  )
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    width: '95%',
    margin: 'auto',
  },
  intro: {
    fontSize: 10
  },
  truckContentsContainer: {
    paddingBottom: 10,
  },
})

const styles = {...CustomText, ...CustomStyle, ...localStyle}