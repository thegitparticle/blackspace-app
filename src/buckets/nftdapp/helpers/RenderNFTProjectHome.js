import React from 'react';
import {View, Text} from 'dripsy';
import {Dimensions, ScrollView, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoUsageShowCase from '../../../dapps/makerdao/screens/MakerDaoUsageShowCase';
import Spacer from '../../../bits/Spacer';
import OkayBearsHome from '../../../nftdapps/okaybears/screens/OkayBearsHome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderNFTProjectHome(props) {
  if (props.function_name === 'OkayBearsBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <OkayBearsHome />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else {
    return (
      <View sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>Welcome to this NFT Project</Text>
      </View>
    );
  }
}

export default RenderNFTProjectHome;
