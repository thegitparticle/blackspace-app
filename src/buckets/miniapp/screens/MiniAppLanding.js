import React, {useMemo, useState} from 'react';
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
import {HScrollView} from 'react-native-head-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import RenderAppInUseHelper from '../helpers/RenderAppInUseHelper';
import LottieView from 'lottie-react-native';
import {useSx} from 'dripsy';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MiniAppLanding({route}) {
  const {app_details} = route.params;
  const sxCustom = useSx();

  const Products = useMemo(
    () =>
      function Products() {
        return (
          <HScrollView index={0}>
            <RenderAppBluePrintHelper
              function_name={app_details.landing_blueprint_function_name}
            />
          </HScrollView>
        );
      },
    [],
  );

  const JargonBuster = useMemo(
    () =>
      function JargonBuster() {
        return (
          <HScrollView index={1}>
            <RenderAppJargonBusterHelper
              function_name={app_details.landing_blueprint_function_name}
            />
          </HScrollView>
        );
      },
    [],
  );

  const UsageShowcase = useMemo(
    () =>
      function UsageShowcase() {
        return (
          <HScrollView index={1}>
            <RenderAppInUseHelper
              function_name={app_details.landing_blueprint_function_name}
            />
          </HScrollView>
        );
      },
    [],
  );

  const [index, setIndex] = useState(0);

  const renderSceneMiniApp = app_details.show_in_use_tab
    ? SceneMap({
        first: Products,
        second: UsageShowcase,
        third: JargonBuster,
      })
    : SceneMap({
        first: Products,
        second: JargonBuster,
      });

  const [routes] = React.useState([
    {key: 'first', title: 'Products'},
    {key: 'second', title: app_details.in_use_tab_name},
    {key: 'third', title: 'Jargon Buster'},
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
            <LottieView
              source={require('../../../../assets/hammer_lottie.json')}
              autoPlay
              loop
              style={sxCustom({height: 30, width: 30})}
              resizeMode="cover"
            />
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <LottieView
              source={require('../../../../assets/hammer_lottie.json')}
              autoPlay
              loop
              style={sxCustom({height: 30, width: 30})}
              resizeMode="cover"
            />
          </View>
        );
      }
    } else if (route.title === app_details.in_use_tab_name) {
      if (focused) {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_focused}>
              {app_details.in_use_tab_name}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.tab_label_view}>
            <Text style={styles.tab_label_text_unfocused}>
              {app_details.in_use_tab_name}
            </Text>
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
      tabStyle={{backgroundColor: themeHere.colors.background}}
    />
  );

  return (
    <CollapsibleHeaderTabView
      renderScrollHeader={() => (
        <SharedElement id={`item.${app_details.app_name}.app_icon`}>
          <HeaderBlock app_details={app_details} />
        </SharedElement>
      )}
      navigationState={{index, routes}}
      renderTabBar={renderTabBarMiniApp}
      renderScene={renderSceneMiniApp}
      onIndexChange={setIndex}
      initialLayout={{width: windowWidth}}
      style={styles.header_tab_view}
      frozeTop={125}
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
    height: 70,
    // justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: themeHere.colors.mid_ground + '25',
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
