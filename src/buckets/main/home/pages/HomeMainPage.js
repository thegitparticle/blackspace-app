import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {GetDiscoverApps} from '../../../../redux/appcore/DiscoverAppsActions';
import {GetMarketPrices} from '../../../../redux/appcore/MarketPricesActions';
import {GetMyApps} from '../../../../redux/appcore/MyAppsActions';
import {GetUniswapTokenList} from '../../../../redux/dapps/uniswap/UniswapTokenListActions';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function HomeMainPage({dispatch}) {
  let dummy_my_app = [
    {
      id: 4,
      name: 'PoolTogether',
      date_created: '2022-02-18T10:52:14Z',
      dapp_cover:
        'http://suprblack.xyz/dapp_images/pooltogether-trophy-detailed_LoYKgdJ.png',
      dapp_icon:
        'http://suprblack.xyz/dapp_images/pooltogether-trophy-detailed.png',
      dapp_bio:
        'A new type of lottery where you do not loose your bet. Deposit crypto and be eligible for lottery. Withdraw anytime',
      landing_blueprint_function_name: 'PoolTogetherLandingBluePrint',
      splash_image:
        'https://i.postimg.cc/gcLRhmxk/pooltogether-trophy-detailed.png',
      tagline: 'No loss lottery',
      add_to_my_app_button_status: false,
      tags: [1],
      usage_tab_name: 'Activity',
      usage_tab_function_name: 'PoolTogetherUsageShowCase',
      link_suite_docs: 'https://pooltogether.com/',
      link_suite_link2: 'https://docs.pooltogether.com/',
    },
  ];

  let default_my_apps = [
    {
      name: 'Send/Receive',
      dapp_icon: 'https://i.postimg.cc/TYfrRPd0/Wormhole-Swirlls1.png',
      dapp_cover:
        'https://i.postimg.cc/3rpB86g8/ian-dooley-i-D5a-VJFCXJg-unsplash.jpg',
      dapp_bio: 'Send & Receive crypto from friends, family & more',
      landing_blueprint_function_name: 'SendReceiveLandingScreen',
      splash_image:
        'https://i.postimg.cc/3rpB86g8/ian-dooley-i-D5a-VJFCXJg-unsplash.jpg',
      tagline: 'Send & Receive crypto from friends, family & more',
      add_to_my_app_button_status: false,
      tags: [1, 2],
      usage_tab_name: 'Activity',
      usage_tab_function_name: '',
      link_suite_docs: '',
      link_suite_link2: '',
    },
    {
      name: 'Tips',
      dapp_icon: 'https://i.postimg.cc/Y0gfQbmp/Group-33529.png',
      dapp_cover: 'https://i.postimg.cc/Y0gfQbmp/Group-33529.png',
      dapp_bio: '',
      landing_blueprint_function_name: 'TipsAppLandingScreen',
      splash_image: 'https://i.postimg.cc/Y0gfQbmp/Group-33529.png',
      tagline: 'Expert curated tips and strategies in Defi',
      add_to_my_app_button_status: false,
      tags: [1, 2],
      usage_tab_name: 'Activity',
      usage_tab_function_name: '',
      link_suite_docs: '',
      link_suite_link2: '',
    },
    {
      name: 'Support',
      dapp_icon: 'https://i.postimg.cc/MGx0V7Ww/Group-33530.png',
      dapp_cover: 'https://i.postimg.cc/MGx0V7Ww/Group-33530.png',
      dapp_bio: '',
      landing_blueprint_function_name: 'SupportScreen',
      splash_image: 'https://i.postimg.cc/MGx0V7Ww/Group-33530.png',
      tagline: '',
      add_to_my_app_button_status: false,
      tags: [1, 2],
      usage_tab_name: 'Activity',
      usage_tab_function_name: '',
      link_suite_docs: '',
      link_suite_link2: '',
    },
  ];

  let my_apps = _.union(state_here.MyAppsReducer.myapps, default_my_apps);
  let discover_apps = _.xorBy(
    state_here.DiscoverAppsReducer.discoverapps,
    state_here.MyAppsReducer.myapps,
    'name',
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(GetMyApps(state_here.UserDetailsReducer.userdetails.id));
    dispatch(GetDiscoverApps(state_here.UserDetailsReducer.userdetails.id));
    dispatch(GetMarketPrices());
    dispatch(GetUniswapTokenList());
  }, [refreshing]);

  return (
    <View variant="layout.full_screen_transparent">
      <Text>home page</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeMainPage);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    width: windowWidth,
  },
  parent_scrollview: {
    width: windowWidth,
  },
  header_right_image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  title_text: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginTop: 15,
  },
});
