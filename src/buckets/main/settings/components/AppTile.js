import {Text, View} from 'dripsy';
import React from 'react';
import {Appearance, Dimensions, Linking, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AppTile() {
  function NotificationsChange() {
    // https://stackoverflow.com/questions/44582694/react-native-open-settings-through-linking-openurl-in-ios
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL('app-settings://notification/soupapp')}>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}
          variant="layout.sub_view_40_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <StyledCircleFastImage25
              source={require('../../../../../assets/notification_icon.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'layout_1'}}>
              Notifications
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={dripsytheme.colors.layout_1}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      sx={{
        backgroundColor: 'layout_4',
        borderRadius: 15,
        marginBottom: '$6',
        alignSelf: 'center',
      }}
      variant="layout.sub_view_20_margin">
      <Text
        variant="body_thick"
        sx={{
          paddingVertical: '$5',
          color: 'layout_1',
          opacity: 0.25,
          alignSelf: 'center',
        }}>
        APP
      </Text>
      <NotificationsChange />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(AppTile);
