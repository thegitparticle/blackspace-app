import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import CryptoPricesPage from '../pages/CryptoPricesPage';
import HomeMainPage from '../pages/HomeMainPage';
import HeaderOnHome from '../components/HeaderOnHome';
import LinearGradient from 'react-native-linear-gradient';
import {Chip} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HomeLandingScreen({dispatch, navigation}) {
  const renderScene = SceneMap({
    first: HomeMainPage,
    second: CryptoPricesPage,
  });

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Home'},
    {key: 'second', title: 'Prices'},
  ]);

  function renderLabel({route, focused}) {
    if (route.title === 'Prices') {
      if (focused) {
        return (
          <View style={styles.tab_label_view_focused}>
            <Text style={styles.tab_label_text_focused}>Prices</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view_unfocused}>
            <Text style={styles.tab_label_text_unfocused}>Prices</Text>
          </View>
        );
      }
    } else if (route.title === 'Home') {
      if (focused) {
        return (
          <View style={styles.tab_label_view_focused}>
            <Text style={styles.tab_label_text_focused}>Home</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view_unfocused}>
            <Text style={styles.tab_label_text_unfocused}>Home</Text>
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View style={styles.tab_label_view_focused}>
            <Text style={styles.tab_label_text_focused}>DeFi</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view_unfocused}>
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
    backgroundColor: themeHere.colors.mid_ground + '25',
    borderRadius: 20,
    width: 100,
  },
  tab_label_view_unfocused: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    backgroundColor: themeHere.colors.mid_ground + '25',
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
