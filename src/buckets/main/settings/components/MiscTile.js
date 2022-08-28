import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'dripsy';
import React from 'react';
import {Dimensions, Linking, TouchableOpacity} from 'react-native';
import {resetSession} from 'react-native-crisp-chat-sdk';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {LOGOUT} from '../../../../redux/types';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
              source={require('../../../../../assets/eye_icon.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'layout_1'}}>
              Privacy Policy
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
              source={require('../../../../../assets/defender_icon.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'layout_1'}}>
              Terms & Conditions
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

  function Logout() {
    return (
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear();
          resetSession();
          dispatch({type: LOGOUT});
        }}>
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
              source={require('../../../../../assets/logout_icon.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'layout_1'}}>
              Logout
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
