import React from 'react';
import {View, Text} from 'dripsy';
import {Dimensions, ScrollView, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderNFTProjectHome(props) {
  if (true) {
    return (
      <View sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>Welcome to this NFT Project</Text>
      </View>
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
