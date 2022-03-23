import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';
import {Bounceable} from 'rn-bounceable';
import CrispChat, {
  resetSession,
  setSessionString,
  setTokenId,
  setUserNickname,
  show,
} from 'react-native-crisp-chat-sdk';
import {connect} from 'react-redux';

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

  return (
    <Bounceable onPress={() => onShowChat()}>
      <View
        sx={{
          width: width,
          height: width * 1.5,
          backgroundColor: 'off_background',
          flexDirection: 'column',
          borderRadius: 15,
          flexWrap: 'wrap',
          my: '$2',
        }}>
        <FastImage
          source={{
            uri: 'https://i.postimg.cc/26g7qPyc/Group-33530.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={sxCustom({
            width: width,
            height: width * 1.125,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          })}
        />
        <View
          sx={{
            width: width,
            height: width * 0.375,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text sx={{color: 'foreground'}} variant="body_medium">
            Support
          </Text>
        </View>
      </View>
      {showChat && <CrispChat />}
    </Bounceable>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SupportAppThumbnail);
