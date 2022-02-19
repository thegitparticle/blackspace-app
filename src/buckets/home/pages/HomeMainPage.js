import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
  SectionList,
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
import BottomSpacer from '../../../bits/BottomSpacer';
import {GetUniswapTokenList} from '../../../redux/dapps/uniswap/UniswapTokenListActions';
import _ from 'lodash';
import DefaultAppThumbnail from '../components/DefaultAppThumbnail';
import SupportAppThumbnail from '../components/SupportAppThumbnail';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HomeMainPage({dispatch}) {
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

  let my_apps = _.union(state_here.MyAppsReducer.myapps, default_my_apps);
  let discover_apps = state_here.DiscoverAppsReducer.discoverapps;

  useEffect(() => {
    dispatch(GetMyApps(state_here.MyProfileReducer.myProfileDetails.id));
    dispatch(GetDiscoverApps(state_here.MyProfileReducer.myProfileDetails.id));
    dispatch(GetMarketPrices());
    dispatch(GetUniswapTokenList());
  }, []);

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
          if (item.app_name === 'Tips') {
            return DefaultAppThumbnail(item);
          } else if (item.app_name === 'Support') {
            return <SupportAppThumbnail />;
          } else {
            return MyAppThumbnail(item);
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
      ListFooterComponent={<BottomSpacer height={75} />}
      spacing={20}
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
