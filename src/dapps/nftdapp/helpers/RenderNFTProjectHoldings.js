import React from 'react';
import {View, Text} from 'dripsy';
import {Dimensions, ScrollView, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import OkayBearsHome from '../../../nftdapps/okaybears/screens/OkayBearsHome';
import SpacerVertical from '../../../bits/SpacerVertical';
import OkayBearsHoldings from '../../../nftdapps/okaybears/screens/OkayBearsHoldings';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderNFTProjectHoldings(props) {
  if (props.function_name === 'OkayBearsBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <OkayBearsHoldings />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else {
    return (
      <View sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>HOLDINGS come here, if any</Text>
      </View>
    );
  }
}

export default RenderNFTProjectHoldings;
