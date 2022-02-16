import React, {useMemo} from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {Avatar, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle/src/index';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {Amplitude} from '@amplitude/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HeaderOnHome() {
  const navigation = useNavigation();
  const sxCustom = useSx();

  const HeaderLeft = useMemo(
    () =>
      function HeaderLeftX() {
        return (
          <Pressable
            onPress={() => {
              Amplitude.getInstance().logEvent(
                'BLACKSPACE_SCREEN_OPEN_BUTTON_CLICK',
              );
              navigation.navigate('TestStack');
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Image
              variant="images.small_icon_30_round"
              source={require('../../../../assets/just_b_logo.png')}
            />
          </Pressable>
        );
      },
    [],
  );

  const HeaderRight = useMemo(
    () =>
      function HeaderRightX() {
        return (
          <Pressable
            onPress={() => {
              Amplitude.getInstance().logEvent(
                'PROFILE_WALLET_OPEN_BUTTON_CLICK',
              );
              navigation.navigate('MyProfileStack');
            }}
            style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <View
              variant="layout.round_icon_container_30"
              sx={{
                backgroundColor: state_here.MyEmojiColorReducer.details.color,
              }}>
              <Text variant="body_medium">
                {state_here.MyEmojiColorReducer.details.emoji}
              </Text>
            </View>
          </Pressable>
        );
      },
    [],
  );

  function HeaderMiddle() {
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}></Pressable>
    );
  }

  const HeaderView = useMemo(
    () =>
      function HeaderView() {
        return (
          <View
            sx={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: '100%',
            }}
            variant="layout.sub_view_0_margin">
            <HeaderLeft />
            <HeaderMiddle />
            <HeaderRight />
          </View>
        );
      },
    [],
  );

  return (
    <View
      sx={{
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
        height: windowHeight * 0.125,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Header
        ViewComponent={HeaderView}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'light-content'}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HeaderOnHome);
