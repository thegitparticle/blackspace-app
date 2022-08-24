import {Text, View} from 'dripsy';
import React from 'react';
import {Appearance, Dimensions, RefreshControl, ScrollView} from 'react-native';
import SpacerVertical from '../../../../bits/SpacerVertical';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function DummyPage() {
  return (
    <View variant="layout.full_screen_transparent">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="title_thick" sx={{color: 'brand_blue'}}>
          blackspace
        </Text>
        <SpacerVertical height={75} />
      </ScrollView>
    </View>
  );
}

export default DummyPage;
