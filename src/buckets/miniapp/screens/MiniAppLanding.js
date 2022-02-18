import React, {useMemo, useState} from 'react';
import {StyleSheet, Dimensions, Appearance, ScrollView} from 'react-native';
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
import {useSx, View, Image, Text} from 'dripsy';
import {runOnJS} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MiniAppLanding({route}) {
  const {app_details, discover_or_not} = route.params;
  const sxCustom = useSx();

  const Products = useMemo(
    () =>
      function Products() {
        return (
          <HScrollView index={0}>
            <RenderAppBluePrintHelper
              function_name={app_details.landing_blueprint_function_name}
              swipe_navigate_function={changeIndexToOne}
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

  const renderSceneMiniApp = discover_or_not
    ? SceneMap({
        first: Products,
        second: JargonBuster,
      })
    : SceneMap({
        first: Products,
        second: UsageShowcase,
        third: JargonBuster,
      });

  const [routes] = discover_or_not
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useState([
        {key: 'first', title: 'Products'},
        {key: 'second', title: 'Jargon Buster'},
      ])
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useState([
        {key: 'first', title: 'Products'},
        {key: 'second', title: app_details.in_use_tab_name},
        {key: 'third', title: 'Jargon Buster'},
      ]);

  function renderLabelMiniApp({route, focused}) {
    if (route.title === 'Products') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              Keyboard
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              Keyboard
            </Text>
          </View>
        );
      }
    } else if (route.title === 'Jargon Buster') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
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
          <View variant="layout.tab_label_chip">
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
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              {app_details.in_use_tab_name}
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              {app_details.in_use_tab_name}
            </Text>
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              ---
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              ---
            </Text>
          </View>
        );
      }
    }
  }

  const renderTabBarMiniApp = props => (
    <TabBar
      {...props}
      indicatorStyle={sxCustom({
        width: 0,
      })}
      style={sxCustom({
        backgroundColor: 'transparent',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        width: windowWidth,
        borderRadius: 30,
        borderTopWidth: 0,
      })}
      renderLabel={renderLabelMiniApp}
      tabStyle={{backgroundColor: themeHere.colors.background}}
    />
  );

  function changeIndexToOne() {
    runOnJS(setIndex(1));
  }

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
      style={{
        flex: 1,
        backgroundColor: themeHere.colors.background,
      }}
      frozeTop={125}
      lazy={true}
      tabBarHeight={50}
      headerHeight={300}
    />
  );
}

export default MiniAppLanding;
