import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {Image, Text, View} from 'dripsy';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function IndexCoopProduct() {
  return (
    <View>
      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
        }}>
        <Image
          variant="images.small_icon_30_round"
          source={require('../../../../../assets/metaverse_index_icon.png')}
          sx={{marginHorizontal: 5}}
        />
        <Text
          variant="header_bold"
          sx={{color: 'foreground', marginHorizontal: 5}}>
          Metaverse Index
        </Text>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(IndexCoopProduct);
