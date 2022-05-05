import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {Bounceable} from 'rn-bounceable';
import CrispChat, {
  setSessionString,
  setTokenId,
  setUserNickname,
} from 'react-native-crisp-chat-sdk';
import {connect} from 'react-redux';
import {SquircleView} from 'react-native-figma-squircle';
import {BlurView} from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const width = (windowWidth - 80) / 3;

let state_here = {};

function SupportAppThumbnail() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // this should be user ID that way app will load previous user chats
    console.log(
      state_here.UserDetailsReducer.userdetails.id + 'user id in support',
    );
    setTokenId(String(state_here.UserDetailsReducer.userdetails.id));

    // setTokenId('1');

    // Set user's info
    setUserNickname(state_here.UserDetailsReducer.userdetails.username);
    setSessionString(
      'wallet_address',
      state_here.UserDetailsReducer.userdetails.wallet_address,
    );
  }, []);

  const sxCustom = useSx();

  const onShowChat = () => {
    setShowChat(!showChat);
  };

  // uri: 'https://i.postimg.cc/26g7qPyc/Group-33530.png',

  return (
    <Bounceable onPress={() => onShowChat()}>
      <MaskedView
        style={sxCustom({
          width: width,
          height: width * 1.5,
          backgroundColor: 'off_background',
          flexDirection: 'column',
          borderRadius: 15,
          flexWrap: 'wrap',
          my: '$2',
        })}
        maskElement={
          <SquircleView
            style={StyleSheet.absoluteFill}
            squircleParams={{
              cornerRadius: 15,
              cornerSmoothing: 1,
            }}
          />
        }>
        <FastImage
          source={{
            uri: 'https://i.postimg.cc/26g7qPyc/Group-33530.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={sxCustom({
            width: width,
            height: width * 1.5,
            borderRadius: 15,
            backgroundColor: 'off_background',
            alignItems: 'center',
            justifyContent: 'flex-end',
          })}>
          <View
            sx={{
              width: width,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BlurView
              style={{
                width: 7 * 0.1 * width,
                height: 25,
                borderRadius: 12.5,
                position: 'absolute',
              }}
              blurType="dark"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <Text
              sx={{
                color: 'foreground',
                flexWrap: 'wrap',
                position: 'absolute',
              }}
              variant="caption_medium">
              Support
            </Text>
          </View>
        </FastImage>
      </MaskedView>
      {showChat && <CrispChat />}
    </Bounceable>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SupportAppThumbnail);
