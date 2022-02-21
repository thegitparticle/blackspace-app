import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
  SectionList,
  RefreshControl,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import MyAppThumbnail from '../components/MyAppThumbnail';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetMyApps} from '../../../redux/appcore/MyAppsActions';
import DiscoverAppThumbnail from '../components/DiscoverAppThumbnail';
import {GetDiscoverApps} from '../../../redux/appcore/DiscoverAppsActions';
import {SectionGrid} from 'react-native-super-grid';
import {GetMarketPrices} from '../../../redux/appcore/MarketPricesActions';
import Spacer from '../../../bits/Spacer';
import {GetUniswapTokenList} from '../../../redux/dapps/uniswap/UniswapTokenListActions';
import _ from 'lodash';
import DefaultAppThumbnail from '../components/DefaultAppThumbnail';
import SupportAppThumbnail from '../components/SupportAppThumbnail';

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
      name: 'Tips',
      dapp_icon: 'https://i.postimg.cc/RVy49JPX/download-14.png',
      dapp_cover: 'https://i.postimg.cc/RVy49JPX/download-14.png',
      dapp_bio: '',
      landing_blueprint_function_name: 'TipsAppLandingScreen',
      splash_image: 'https://i.postimg.cc/RVy49JPX/download-14.png',
      tagline: '',
      add_to_my_app_button_status: false,
      tags: [1, 2],
      usage_tab_name: 'Activity',
      usage_tab_function_name: '',
      link_suite_docs: '',
      link_suite_link2: '',
    },
    {
      name: 'Support',
      dapp_icon: 'https://i.postimg.cc/Rh85M2TN/download-39.jpg',
      dapp_cover: 'https://i.postimg.cc/Rh85M2TN/download-39.jpg',
      dapp_bio: '',
      landing_blueprint_function_name: 'SupportScreen',
      splash_image: 'https://i.postimg.cc/Rh85M2TN/download-39.jpg',
      tagline: '',
      add_to_my_app_button_status: false,
      tags: [1, 2],
      usage_tab_name: 'Activity',
      usage_tab_function_name: '',
      link_suite_docs: '',
      link_suite_link2: '',
    },
  ];

  let my_apps = _.union(dummy_my_app, default_my_apps);
  let discover_apps = state_here.DiscoverAppsReducer.discoverapps;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(GetMyApps(state_here.MyProfileReducer.myProfileDetails.id));
    dispatch(GetDiscoverApps(state_here.MyProfileReducer.myProfileDetails.id));
    dispatch(GetMarketPrices());
    dispatch(GetUniswapTokenList());
  }, [refreshing]);

  const DATA = [
    {
      title: 'MY APP SUITE',
      data: my_apps,
    },
    {
      title: 'DISCOVER',
      data: discover_apps,
    },
  ];

  const ThumbnailItem = useMemo(
    () =>
      function ThumbnailItem({item, section}) {
        if (section.title === 'MY APP SUITE') {
          if (item.name === 'Tips') {
            return <DefaultAppThumbnail app_details={item} />;
          } else if (item.name === 'Support') {
            return <SupportAppThumbnail />;
          } else {
            return <MyAppThumbnail app_details={item} />;
          }
        } else {
          return <DiscoverAppThumbnail app_details={item} />;
        }
      },
    [],
  );

  return (
    <SectionGrid
      itemDimension={100}
      sections={DATA}
      renderItem={({item, section}) => (
        <ThumbnailItem item={item} section={section} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.title_text}>{title}</Text>
      )}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<Spacer height={75} />}
      spacing={20}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={themeHere.colors.foreground}
        />
      }
    />
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
