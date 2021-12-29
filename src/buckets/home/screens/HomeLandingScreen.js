import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Appearance,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {ButterThemeLight, ButterThemeDark} from '../../../theme/ButterTheme';
import {TabView, SceneMap} from 'react-native-tab-view';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import CryptoPricesPage from '../pages/CryptoPricesPage';
import HomeMainPage from '../pages/HomeMainPage';
import NftsPage from '../pages/NftsPage';
import DefiPage from '../pages/DefiPage';
import HeaderOnHome from '../components/HeaderOnHome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HomeLandingScreen({dispatch, navigation}) {
  const renderScene = SceneMap({
    first: CryptoPricesPage,
    second: HomeMainPage,
    third: NftsPage,
    fourth: DefiPage,
  });

  const [index, setIndex] = useState(1);

  const [routes] = React.useState([
    {key: 'first', title: 'Market'},
    {key: 'second', title: 'Home'},
    {key: 'third', title: 'NFTs'},
    {key: 'fourth', title: 'DeFi'},
  ]);

  return (
    <View style={styles.parent_view}>
      <HeaderOnHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: windowWidth}}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeLandingScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    backgroundColor: themeHere.colors.background,
  },
});
