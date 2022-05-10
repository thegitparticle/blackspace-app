import React, {useCallback, useState} from 'react';
import {Appearance, Dimensions, RefreshControl, StyleSheet} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Spacer from '../../../bits/Spacer';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import MyAppThumbnail from '../components/MyAppThumbnail';
import NFTDAppThumbnail from '../components/NFTDAppThumbnail';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function NftsPage() {
  let dummy_nft_dapps = [
    {
      id: 108,
      name: 'OkayBears',
      date_created: '2022-02-18T10:52:14Z',
      dapp_cover: 'https://i.postimg.cc/VLXqpsZP/FR9svjf-XIAAf-Vxb.jpg',
      dapp_icon:
        'https://i.postimg.cc/NMyT4Q2V/62595ef46940831464f1cce2-Yoyo.png',
      dapp_bio:
        'Okay Bears is a culture shift. A clean collection of 10,000 diverse bears building a virtuous community that will transcend the internet into the real world.',
      landing_blueprint_function_name: 'PoolTogetherLandingBluePrint',
      splash_image:
        'https://i.postimg.cc/wj0mY1hZ/622063039e289f27bc601f67-OKB-Logo.png',
      tagline:
        'Okay Bears is a culture shift. A clean collection of 10,000 diverse bears building a virtuous community that will transcend the internet into the real world.',
      add_to_my_app_button_status: false,
      tags: [1],
      usage_tab_name: 'Activity',
      usage_tab_function_name: 'OkayBearsShowcase',
      link_suite_website: 'https://www.okaybears.com',
      link_suite_twitter: 'https://twitter.com/okaybears',
      link_suite_marketplace: 'https://magiceden.io/marketplace/okay_bears',
    },
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <FlatGrid
      itemDimension={100}
      data={dummy_nft_dapps}
      renderItem={({item}) => <NFTDAppThumbnail app_details={item} />}
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

export default NftsPage;
