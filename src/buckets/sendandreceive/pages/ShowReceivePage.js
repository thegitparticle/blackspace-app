import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {View, Text, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import * as qrcode from 'qrcode';
import {connect} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import SquircleButton from '../../../bits/SquircleButton';
import Clipboard from '@react-native-clipboard/clipboard';
import {Bounceable} from 'rn-bounceable';
import {showMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function ShowReceivePage() {
  // props - ChangeBodyBack

  const navigation = useNavigation();

  function HeaderHere() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
          flexDirection: 'row',
          height: 75,
        }}>
        <Pressable style={{padding: 20}}>
          <Iconly
            name="SettingBold"
            color={themeHere.colors.foreground + '00'}
            size={25}
          />
        </Pressable>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: themeHere.colors.foreground,
          }}>
          RECEIVE
        </Text>
        <Pressable style={{padding: 20}} onPress={() => navigation.goBack()}>
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground}
            size={25}
          />
        </Pressable>
      </View>
    );
  }

  let walletQRCode = qrcode.toString(
    state_here.WDeetsReducer.wdeets.wallet_address,
  );

  const copyToClipboard = () => {
    Clipboard.setString(state_here.WDeetsReducer.wdeets.wallet_address);
    showMessage({
      message: 'wallet address copied',
      type: 'success',
      backgroundColor: themeHere.colors.success_green_dark,
    });
  };

  return (
    <View sx={{flex: 1, alignItems: 'center'}}>
      <HeaderHere />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          variant="subhead_medium"
          sx={{color: 'foreground', opacity: 0.75, marginVertical: '$4'}}>
          Your wallet's QR Code
        </Text>
        <View
          sx={{
            width: windowWidth * 0.8,
            height: windowWidth * 0.8,
            marginTop: '$2',
            marginBottom: '$4',
          }}>
          <SvgXml xml={walletQRCode._55} width="100%" height="100%" />
        </View>
        <Text
          variant="subhead_medium"
          sx={{color: 'foreground', opacity: 0.75, marginVertical: '$4'}}>
          Your wallet address
        </Text>
        <View
          sx={{
            width: windowWidth * 0.8,
            height: windowWidth * 0.8,
            alignItems: 'center',
          }}>
          <Text
            variant="subhead_medium"
            sx={{color: 'foreground', marginBottom: '$4', textAlign: 'center'}}>
            {state_here.WDeetsReducer.wdeets.wallet_address}
          </Text>
          <Bounceable onPress={copyToClipboard}>
            <SquircleButton
              buttonColor={'#4E44CE'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'Copy Address'}
              font={themeHere.text.subhead_medium}
              textColor={'#FFFFFF'}
            />
          </Bounceable>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ShowReceivePage);
