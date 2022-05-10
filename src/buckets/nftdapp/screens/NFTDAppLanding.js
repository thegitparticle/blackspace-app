import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import {Text, useSx, View} from 'dripsy';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import FastImage from 'react-native-fast-image';
import RenderNFTProjectHome from '../helpers/RenderNFTProjectHome';
import RenderNFTProjectDetails from '../helpers/RenderNFTProjectDetails';
import RenderNFTProjectHoldings from '../helpers/RenderNFTProjectHoldings';
import HeaderNFTDApp from '../components/HeaderBlockNFTDApp';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function NFTDAppLanding({route}) {
  const {app_details, discover_or_not} = route.params;
  const sxCustom = useSx();

  const [renderSplash, setRenderSplash] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRenderSplash(false);
    }, 1000);
  }, []);

  const Home = useMemo(
    () =>
      function Home() {
        return (
          <RenderNFTProjectHome
            function_name={app_details.landing_blueprint_function_name}
            // swipe_navigate_function={changeIndexToOne}
          />
        );
      },
    [],
  );

  const Details = useMemo(
    () =>
      function Details() {
        return (
          <RenderNFTProjectDetails
            function_name={app_details.landing_blueprint_function_name}
            appInfo={app_details}
          />
        );
      },
    [],
  );

  const Holdings = useMemo(
    () =>
      function Holdings() {
        return (
          <RenderNFTProjectHoldings
            function_name={app_details.landing_blueprint_function_name}
          />
        );
      },
    [],
  );

  const renderSceneMiniDApp = discover_or_not
    ? SceneMap({
        first: Home,
        second: Details,
      })
    : SceneMap({
        first: Home,
        second: Holdings,
        third: Details,
      });

  const [routes] = discover_or_not
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useState([
        {key: 'first', title: 'Home'},
        {key: 'second', title: 'Details'},
      ])
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useState([
        {key: 'first', title: 'Home'},
        {key: 'second', title: 'Holdings'},
        {key: 'third', title: 'Details'},
      ]);

  function renderLabelMiniDApp({route, focused}) {
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
              name="HomeBroken"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        );
      }
    } else if (route.title === 'Details') {
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
    } else if (route.title === 'Holdings') {
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

  const renderTabBarMiniDApp = props => (
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
        width: discover_or_not ? windowWidth * 0.5 : windowWidth * 0.6,
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
      renderLabel={renderLabelMiniDApp}
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
              <HeaderNFTDApp app_details={app_details} />
              <TabView
                navigationState={{index, routes}}
                renderTabBar={renderTabBarMiniDApp}
                renderScene={renderSceneMiniDApp}
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

export default NFTDAppLanding;
