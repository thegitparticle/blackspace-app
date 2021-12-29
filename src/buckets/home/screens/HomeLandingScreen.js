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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
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

  function renderLabel({route, focused}) {
    if (route.title === 'Market') {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>Market</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>Market</Text>
          </View>
        );
      }
    } else if (route.title === 'Home') {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>Home</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>Home</Text>
          </View>
        );
      }
    } else if (route.title === 'NFTs') {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>NFTs</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>NFTs</Text>
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>DeFi</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>DeFi</Text>
          </View>
        );
      }
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tab_bar_indicator}
      style={styles.tab_bar}
      renderLabel={renderLabel}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <View style={styles.parent_view}>
      <HeaderOnHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
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
  tab_bar: {
    backgroundColor: themeHere.colors.off_background,
    height: 50,
    // justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth,
    borderRadius: 30,
    borderTopWidth: 0,
    shadowColor: themeHere.colors.mid_ground,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  tab_bar_indicator: {
    width: 0,
  },
  tab_label_view: {
    alignItems: 'center',
    alignContent: 'center',
    height: 50,
    justifyContent: 'center',
  },
  tab_label_text_focused: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.red,
  },
  tab_label_text_unfocused: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
  },
});
