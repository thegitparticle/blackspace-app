import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {Text, View, Image, useSx, styled} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MainDetails() {
  let wallet_add = state_here.UserDetailsReducer.userdetails.wallet_address;
  let render_wallet_string =
    wallet_add.slice(0, 4) + '...' + +wallet_add.slice(-2);

  const copyToClipboard = () => {
    Clipboard.setString(wallet_add);
  };

  return (
    <View
      variant="sub_view_0_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        mt: '$4',
      }}>
      <Bounceable>
        <FastImage
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            marginVertical: 10,
          }}
          source={{
            uri: 'https://i.postimg.cc/7hSZWDz1/photo-1541562232579-512a21360020.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Bounceable>
      <Text
        variant="subhead_medium"
        sx={{
          color: 'foreground',
          my: '$2',
        }}>
        {state_here.UserDetailsReducer.userdetails.username}
      </Text>
      <Pressable onPress={copyToClipboard}>
        <View
          sx={{
            flexDirection: 'row',
            my: '$2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
              opacity: 0.5,
              maxWidth: windowWidth * 0.2,
              mx: '$2',
            }}>
            {render_wallet_string}
          </Text>
          <Icon
            name="copy"
            type="feather"
            color={themeHere.colors.foreground + '50'}
            size={16}
          />
        </View>
      </Pressable>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MainDetails);
