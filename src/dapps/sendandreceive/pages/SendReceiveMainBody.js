import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {View, Text, Image, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from 'rn-bounceable';
import LinearGradient from 'react-native-linear-gradient';
import {randomColorGenerator} from '../../../helpers/randomColorGenerator';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const suggestedWalletsList = [];
const suggestedWalletsList2 = [
  {
    walletAddress: '0x3334883994984',
  },
  {
    walletAddress: '0xn3jj33jj3kjk3jk',
  },
  {
    walletAddress: '0x3j3j333984',
  },
  {
    walletAddress: '0x9mkdkkdkdjk3jk',
  },
  {
    walletAddress: '0xk902939399393',
  },
  {
    walletAddress: '0xn3jj33jj3kjk3jk',
  },
];

function SendReceiveMainBody(props) {
  // props - ChangeBodyToScanner, ChangeBodyToQRPage, ChangeBodyToSendPage

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
          SEND / RECEIVE
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

  function RenderOptionsBlock() {
    function OneOptionComponent(props) {
      return (
        <SquircleView
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: themeHere.colors.mid_ground + '75',
          }}
          style={{
            width: windowWidth * 0.2,
            height: windowWidth * 0.3,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            variant="images.small_icon_30_round"
            source={props.IconSource}
          />
          <Text variant="subhead_medium" sx={{color: 'foreground'}}>
            {props.Title}
          </Text>
        </SquircleView>
      );
    }

    return (
      <View
        sx={{
          width: windowWidth * 0.8,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexItems: 'center',
          marginVertical: '$4',
        }}>
        {/*<Bounceable onPress={() => props.ChangeBodyToScanner()}>*/}
        {/*  <OneOptionComponent*/}
        {/*    Title={'Scan'}*/}
        {/*    IconSource={require('../../../../assets/appicon_1024_white_bg.png')}*/}
        {/*  />*/}
        {/*</Bounceable>*/}
        <Bounceable onPress={() => props.ChangeBodyToSendPage()}>
          <OneOptionComponent
            Title={'Send'}
            IconSource={require('../../../../assets/appicon_1024_white_bg.png')}
          />
        </Bounceable>
        <Bounceable onPress={() => props.ChangeBodyToQRPage()}>
          <OneOptionComponent
            Title={'Receive'}
            IconSource={require('../../../../assets/appicon_1024_white_bg.png')}
          />
        </Bounceable>
      </View>
    );
  }

  function SuggestedWallets() {
    function RenderWallet(props) {
      // props - WalletAddress
      const colorA = randomColorGenerator();
      const colorB = randomColorGenerator();

      return (
        <View
          sx={{
            mh: '$4',
            marginVertical: '$2',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <LinearGradient
            colors={[colorA, colorB]}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
              opacity: 1,
              marginVertical: '$4',
              marginHorizontal: '$2',
            }}>
            {props.WalletAddress}
          </Text>
        </View>
      );
    }

    if (suggestedWalletsList.length > 0) {
      return (
        <View>
          {suggestedWalletsList.map(item => (
            <RenderWallet WalletAddress={item.walletAddress} />
          ))}
        </View>
      );
    } else {
      return (
        <View
          sx={{
            width: windowWidth * 0.8,
            alignItems: 'center',
            height: windowHeight * 0.3,
            justifyContent: 'center',
          }}>
          <Text
            sx={{
              ...themeHere.text.subhead_medium,
              color: 'foreground',
              opacity: 0.5,
            }}>
            no transactions have been done by you
          </Text>
        </View>
      );
    }
  }

  return (
    <View sx={{flex: 1, alignItems: 'center'}}>
      <HeaderHere />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderOptionsBlock />
        <Text
          variant="subhead_medium"
          sx={{color: 'foreground', opacity: 0.75, marginVertical: '$4'}}>
          recent interactions
        </Text>
        <SuggestedWallets />
      </ScrollView>
    </View>
  );
}

export default SendReceiveMainBody;
