import React from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {useSx, View, Image, Text, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import TipTile from '../components/TipTile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function ProTipsPage() {
  let allTips = state_here.AllTipsReducer.alltips;

  return (
    <View variant="full_screen_transparent">
      <ScrollView>
        {allTips.map(item => (
          <TipTile tipInfo={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ProTipsPage);
