import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Text, View, Image} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {connect} from 'react-redux';
import {LOGOUT} from '../../../redux/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MiscTile({dispatch}) {
  function PrivacyPolicy() {
    return (
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.notion.so/ayespaces/Privacy-Policy-b2f432d16d88458281babd62457df2b4',
          )
        }>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/eye_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              Privacy Policy
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function TermsAndConditions() {
    return (
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.notion.so/ayespaces/Terms-of-Service-93d01782de4042708a5c10decaa1484c',
          )
        }>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/defender_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              Terms & Conditions
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function Logout() {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch({type: LOGOUT});
          AsyncStorage.clear();
        }}>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/logout_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              Logout
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      sx={{
        backgroundColor: 'off_background',
        borderRadius: 15,
        marginBottom: '$6',
        alignItems: 'center',
      }}
      variant="layout.sub_view_20_margin">
      <Text
        variant="subhead_medium"
        sx={{
          paddingVertical: '$5',
          color: 'foreground',
          opacity: 0.25,
        }}>
        MISC
      </Text>
      <PrivacyPolicy />
      <TermsAndConditions />
      <Logout />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MiscTile);
