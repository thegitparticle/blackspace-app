import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {useSx, View, Image, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import HeaderMiniAppV2 from '../../../bits/HeaderMiniAppV2';
import {HScrollView} from 'react-native-head-tab-view';
import RenderAppBluePrintHelper from '../../miniapp/helpers/RenderAppBluePrintHelper';
import RenderAppJargonBusterHelper from '../../miniapp/helpers/RenderAppJargonBusterHelper';
import RenderAppInUseHelper from '../../miniapp/helpers/RenderAppInUseHelper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import {runOnJS} from 'react-native-reanimated';
import BottomSpacer from '../../../bits/BottomSpacer';
import {useHeaderHeight} from '@react-navigation/elements';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import StarterTipsPage from '../pages/StarterTipsPage';
import ProTipsPage from '../pages/ProTipsPage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function TipsAppLandingScreen({route}) {
  const {app_details} = route.params;

  const headerHeight = useHeaderHeight();
  const sxCustom = useSx();

  const Products = useMemo(
    () =>
      function Products() {
        return (
          <RenderAppBluePrintHelper
            function_name={app_details.landing_blueprint_function_name}
            swipe_navigate_function={changeIndexToOne}
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

  const [index, setIndex] = useState(0);

  const renderSceneMiniApp = SceneMap({
    first: StarterTipsPage,
    second: ProTipsPage,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'starter'},
    {key: 'second', title: 'pro'},
  ]);

  function renderLabelMiniApp({route, focused}) {
    if (route.title === 'starter') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              starter
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              starter
            </Text>
          </View>
        );
      }
    } else if (route.title === 'pro') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              pro
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              pro
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
        backgroundColor: themeHere.colors.off_background,
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        width: windowWidth,
        borderRadius: 30,
        borderTopWidth: 0,
      })}
      renderLabel={renderLabelMiniApp}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  function changeIndexToOne() {
    runOnJS(setIndex(1));
  }

  return (
    <View style={styles.parent_view}>
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

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TipsAppLandingScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.dark,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 50,
  },
});
