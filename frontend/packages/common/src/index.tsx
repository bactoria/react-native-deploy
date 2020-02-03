import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Routes } from './Routes';
import { mainStoreContext } from './store/MainStore';
import { CustomStyle } from './static/CustomStyle';
import { Header } from './components/main/Header';

export const App: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  
  mainStore.screenWidth = Dimensions.get('window').width;
  mainStore.screenHeight = Dimensions.get('window').height;
  mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight - mainStore.headerHeight;

  return (
    <View style={{ height: mainStore.screenHeight, flex: 1 }}>
      <Header />
      <Routes height={mainStore.scrollviewHeight} headerHeight={mainStore.headerHeight} footerHeight={mainStore.footerHeight}/>
    </View>
  )
})

// define new style here to override CustomStyle stylesheet.
const localStyle = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#efefef',
  },
  sectionContainer: {
    marginTop: 0,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column"
  },
  navButtonImage: {
    tintColor: '#ffffff',
    height: 30,
    width: 30,
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  navButtonText: {
    fontWeight: '300',
    fontSize: 8,
    color: '#ffffff'
  }
});

const styles = { ...CustomStyle, ...localStyle }