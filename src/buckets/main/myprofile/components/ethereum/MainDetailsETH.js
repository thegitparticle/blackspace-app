import Clipboard from '@react-native-clipboard/clipboard';
import {Text, View} from 'dripsy';
import React from 'react';
import {Appearance, Dimensions, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MainDetailsETH() {
  let wallet_add = state_here.UserDetailsReducer.userdetails.wallet_address;
  let render_wallet_string =
    wallet_add.slice(0, 4) + '...' + wallet_add.slice(-2);

  const copyToClipboard = () => {
    Clipboard.setString(wallet_add);
    showMessage({
      message: 'wallet address copied',
      type: 'success',
      backgroundColor: themeHere.colors.success_green,
    });
  };

  const clickOnDpAction = () => {
    showMessage({
      message: 'you will soon to able to add your NFT as DP',
      type: 'success',
      backgroundColor: themeHere.colors.blue_dark,
    });
  };

  return (
    <View
      variant="sub_view_0_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        mt: '$4',
      }}>
      <Bounceable onPress={clickOnDpAction}>
        <FastImage
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginVertical: 10,
          }}
          source={{
            uri: 'https://i.postimg.cc/YCL0q94W/red-icon.png',
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

export default connect(mapStateToProps)(MainDetailsETH);
