import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {View, Text, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import * as qrcode from 'qrcode';
import {connect} from 'react-redux';
import {SvgXml} from 'react-native-svg';

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

  console.log(walletQRCode);

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
            backgroundColor: 'pink',
            opacity: 0.25,
          }}>
          <SvgXml xml={walletQRCode._55} width="100%" height="100%" />
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
