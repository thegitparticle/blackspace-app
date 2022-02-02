import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import CrispChat, {
  setUserEmail,
  setUserNickname,
  setUserPhone,
  resetSession,
  setSessionString,
  setTokenId,
  show,
} from 'react-native-crisp-chat-sdk';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SupportScreen() {
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    // this should be user ID that way app will load previous user chats
    setTokenId(state_here.UserDetailsReducer.userdetails.id);

    // Set user's info
    setUserNickname(state_here.UserDetailsReducer.userdetails.username);
    setSessionString(
      'wallet_address',
      state_here.UserDetailsReducer.userdetails.wallet_address,
    );

    show();
  }, []);

  return <View style={styles.parent_view}>{showChat && <CrispChat />}</View>;
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SupportScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
  },
});
