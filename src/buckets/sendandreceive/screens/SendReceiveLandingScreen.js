import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useSx} from 'dripsy';
import {GetAllTips} from '../../../redux/appcore/AllTipsActions';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import StarterTipsPage from '../../tips/pages/StarterTipsPage';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import FastImage from 'react-native-fast-image';
import HeaderMiniAppV2 from '../../../bits/HeaderMiniAppV2';
import { connect } from "react-redux";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SendReceiveLandingScreen({route, dispatch}) {
  const {app_details} = route.params;

  const sxCustom = useSx();

  const [renderSplash, setRenderSplash] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(GetAllTips());
    setTimeout(() => {
      setRenderSplash(false);
    }, 1000);
  }, []);

  const renderSceneMiniApp = SceneMap({
    first: StarterTipsPage,
    // second: ProTipsPage,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'starter tips'},
    // {key: 'second', title: 'pro'},
  ]);

  function renderLabelMiniApp({route, focused}) {
    if (route.title === 'starter tips') {
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
    } else if (route.title === 'pro') {
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
        width: windowWidth * 0.5,
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

  const RenderScreen = useMemo(
    () =>
      function RenderScreen() {
        if (renderSplash) {
          return (
            <FastImage
              style={{width: windowWidth, height: windowHeight}}
              source={{
                uri: app_details.dapp_cover,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
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
    <View style={styles.parent_view}>
      <Text>Send and get tokens, coins and more things!</Text>
      <RenderScreen />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SendReceiveLandingScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
