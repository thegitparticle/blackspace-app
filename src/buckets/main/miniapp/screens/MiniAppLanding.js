import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import RenderAppBluePrintHelper from '../helpers/RenderAppBluePrintHelper';
import RenderAppJargonBusterHelper from '../helpers/RenderAppJargonBusterHelper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import RenderAppInUseHelper from '../helpers/RenderAppInUseHelper';
import LottieView from 'lottie-react-native';
import {Text, useSx, View} from 'dripsy';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import FastImage from 'react-native-fast-image';
import HeaderMiniAppV2 from '../../../../bits/HeaderMiniAppV2';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MiniAppLanding({route}) {
  const {app_details, discover_or_not} = route.params;
  const sxCustom = useSx();

  const [renderSplash, setRenderSplash] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRenderSplash(false);
    }, 1000);
  }, []);

  const Products = useMemo(
    () =>
      function Products() {
        return (
          <RenderAppBluePrintHelper
            function_name={app_details.landing_blueprint_function_name}
            // swipe_navigate_function={changeIndexToOne}
          />
        );
      },
    [],
  );

  const JargonBuster = useMemo(
    () =>
      function JargonBuster() {
        return (
          <RenderAppJargonBusterHelper
            function_name={app_details.landing_blueprint_function_name}
            appInfo={app_details}
          />
        );
      },
    [],
  );

  const UsageShowcase = useMemo(
    () =>
      function UsageShowcase() {
        return (
          <RenderAppInUseHelper
            function_name={app_details.landing_blueprint_function_name}
          />
        );
      },
    [],
  );

  const renderSceneMiniApp = discover_or_not
    ? SceneMap({
        first: Products,
        second: JargonBuster,
      })
    : app_details.usage_tab_function_name === 'UniswapUsageShowCase' ||
      app_details.usage_tab_function_name === 'MemeCoinsUsageShowCase'
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
    : app_details.usage_tab_function_name === 'UniswapUsageShowCase' ||
      app_details.usage_tab_function_name === 'MemeCoinsUsageShowCase'
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
              name="HomeBroken"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      }
    } else if (route.title === 'Jargon Buster') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <LottieView
              source={require('../../../../../assets/hammer_lottie.json')}
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
              source={require('../../../../../assets/hammer_lottie.json')}
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
            <Iconly
              name="ActivityBold"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly
              name="ActivityBroken"
              color={themeHere.colors.foreground}
              size={25}
            />
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
        backgroundColor: themeHere.colors.off_background,
        position: 'absolute',
        bottom: 0,
        color: '#000',
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        width: discover_or_not
          ? windowWidth * 0.5
          : app_details.usage_tab_function_name === 'UniswapUsageShowCase' ||
            app_details.usage_tab_function_name === 'MemeCoinsUsageShowCase'
          ? windowWidth * 0.5
          : windowWidth * 0.7,
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
      renderLabel={renderLabelMiniApp}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  // function changeIndexToOne() {
  //   runOnJS(setIndex(1));
  // }

  const RenderScreen = useMemo(
    () =>
      function RenderScreen() {
        if (renderSplash) {
          return (
            <FastImage
              style={{width: windowWidth, height: windowHeight}}
              source={{
                uri: app_details.splash_image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          );
        } else {
          return (
            <View>
              <HeaderMiniAppV2 app_details={app_details} />
              <TabView
                navigationState={{index, routes}}
                renderTabBar={renderTabBarMiniApp}
                renderScene={renderSceneMiniApp}
                onIndexChange={setIndex}
                initialLayout={{width: windowWidth}}
                tabBarPosition="bottom"
              />
            </View>
          );
        }
      },
    [renderSplash],
  );

  return (
    <View
      sx={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: themeHere.colors.dark,
      }}>
      <RenderScreen />
    </View>
  );
}

export default MiniAppLanding;
