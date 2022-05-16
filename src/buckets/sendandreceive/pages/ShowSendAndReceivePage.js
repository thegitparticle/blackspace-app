import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {View, Text, Image, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ShowSendAndReceivePage(props) {
  // props - ChangeBodyToScanner, ChangeBodyToQRPage

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
            fillColor: themeHere.colors.mid_ground + '50',
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
          justifyContent: 'space-between',
          flexItems: 'center',
          marginVertical: '$4',
        }}>
        <Bounceable onPress={() => props.ChangeBodyToScanner()}>
          <OneOptionComponent
            Title={'Scan'}
            IconSource={require('../../../../assets/appicon_1024_white_bg.png')}
          />
        </Bounceable>
        <Bounceable onPress={() => props.ChangeBodyToScanner()}>
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
      </ScrollView>
    </View>
  );
}

export default ShowSendAndReceivePage;
