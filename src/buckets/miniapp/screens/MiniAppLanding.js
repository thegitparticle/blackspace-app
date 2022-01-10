import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SharedElement} from 'react-native-shared-element';
import HeaderBlock from '../components/HeaderBlock';
import RenderAppBluePrintHelper from '../helpers/RenderAppBluePrintHelper';
import RenderAppJargonBusterHelper from '../helpers/RenderAppJargonBusterHelper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CryptoPricesPage from '../../home/pages/CryptoPricesPage';
import HomeMainPage from '../../home/pages/HomeMainPage';
import {HScrollView} from 'react-native-head-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MiniAppLanding({route}) {
  const {app_details} = route.params;

  const Products = () => (
    <HScrollView index={0}>
      <RenderAppBluePrintHelper
        function_name={app_details.landing_blueprint_function_name}
      />
      {/*<View style={{flex: 1, backgroundColor: '#ff4081'}} />*/}
    </HScrollView>
  );

  const JargonBuster = () => (
    <HScrollView index={1}>
      <RenderAppJargonBusterHelper
        function_name={app_details.landing_blueprint_function_name}
      />
      {/*<View style={{flex: 1, backgroundColor: '#673ab7'}} />*/}
    </HScrollView>
  );

  const renderSceneMiniApp = SceneMap({
    first: Products,
    second: JargonBuster,
  });

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Products'},
    {key: 'second', title: 'Jargon Buster'},
  ]);

  function renderLabelMiniApp({route, focused}) {
    if (route.title === 'Products') {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>Products</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>Products</Text>
          </View>
        );
      }
    } else if (route.title === 'Jargon Buster') {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>Jargon Buster</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>Jargon Buster</Text>
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>---</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>---</Text>
          </View>
        );
      }
    }
  }

  const renderTabBarMiniApp = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tab_bar_indicator}
      style={styles.tab_bar}
      renderLabel={renderLabelMiniApp}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <CollapsibleHeaderTabView
      renderScrollHeader={() => (
        <SharedElement id={`item.${app_details.app_name}.app_icon`}>
          <HeaderBlock app_details={app_details} style={{top: 0}} />
        </SharedElement>
      )}
      navigationState={{index, routes}}
      renderTabBar={renderTabBarMiniApp}
      renderScene={renderSceneMiniApp}
      onIndexChange={setIndex}
      initialLayout={{width: windowWidth}}
      style={styles.header_tab_view}
      frozeTop={150}
      lazy={true}
      tabBarHeight={50}
      headerHeight={300}
    />
  );
}

export default MiniAppLanding;

const styles = StyleSheet.create({
  parent_scroll_view: {
    flex: 1,
    backgroundColor: themeHere.colors.background,
  },
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
  header_tab_view: {
    flex: 1,
    backgroundColor: themeHere.colors.background,
  },
  cover_image: {
    width: windowWidth,
    height: 200,
  },
  tab_bar: {
    backgroundColor: themeHere.colors.off_background + '00',
    height: 50,
    // justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth,
    borderRadius: 30,
    borderTopWidth: 0,
    // shadowColor: themeHere.colors.mid_ground,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
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
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.red,
  },
  tab_label_text_unfocused: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
  },
});
