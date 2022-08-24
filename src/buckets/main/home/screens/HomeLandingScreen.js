import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import HeaderOnHome from '../components/HeaderOnHome';
import CryptoPricesPage from '../pages/CryptoPricesPage';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {Text, useSx, View} from 'dripsy';
import DummyPage from '../pages/DummyPage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HomeLandingScreen({dispatch, navigation}) {
  const sxCustom = useSx();

  const renderScene = SceneMap({
    first: DummyPage,
    second: DummyPage,
    third: DummyPage,
  });

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Home'},
    {key: 'second', title: 'Farms'},
    {key: 'third', title: 'Save'},
  ]);

  function renderLabel({route, focused}) {
    if (route.title === 'Home') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="HomeBold"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="HomeBold"
              color={themeHere.colors.foreground + '50'}
              size={25}
            />
          </View>
        );
      }
    } else if (route.title === 'Farms') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="Filter2Bold"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="Filter2Bold"
              color={themeHere.colors.foreground + '50'}
              size={25}
            />
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="DiscountBold"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="DiscountBold"
              color={themeHere.colors.foreground + '50'}
              size={25}
            />
          </View>
        );
      }
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={sxCustom({
        width: 0,
      })}
      style={sxCustom({
        backgroundColor: themeHere.colors.off_background,
        position: 'absolute',
        bottom: 0,
        color: '#000',
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.7,
        marginBottom: windowHeight * 0.05,
        borderRadius: 30,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      })}
      renderLabel={renderLabel}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <LinearGradient
      colors={[
        themeHere.colors.off_background,
        themeHere.colors.background,
        themeHere.colors.background,
      ]}
      style={styles.parent_view}>
      <HeaderOnHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: windowWidth}}
      />
    </LinearGradient>
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
    backgroundColor: 'transparent',
    height: 75,
    alignSelf: 'center',
    width: windowWidth,
    borderRadius: 30,
    borderTopWidth: 0,
    justifyContent: 'center',
  },
  tab_bar_indicator: {
    width: 0,
  },
  tab_label_view_focused: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    backgroundColor: themeHere.colors.mid_ground + '75',
    borderRadius: 20,
    width: 100,
  },
  tab_label_view_unfocused: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    backgroundColor: themeHere.colors.mid_ground + '75',
    borderRadius: 20,
    width: 100,
  },
  tab_label_text_focused: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.red,
  },
  tab_label_text_unfocused: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
  },
});
