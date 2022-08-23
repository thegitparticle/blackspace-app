import {Amplitude} from '@amplitude/react-native';
import {useNavigation} from '@react-navigation/native';
import {Image, useSx, View} from 'dripsy';
import React, {useMemo} from 'react';
import {Appearance, Dimensions, Pressable} from 'react-native';
import {Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {StyledFastImage35} from '../../../../theme/DripsyTheme';

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
              navigation.navigate('BrandLandingScreen');
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Image
              variant="images.small_icon_30_round"
              source={require('../../../../../assets/appicon_1024_white_bg.png')}
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
            {/*<View*/}
            {/*  variant="layout.round_icon_container_30"*/}
            {/*  sx={{*/}
            {/*    backgroundColor: state_here.MyEmojiColorReducer.details.color,*/}
            {/*  }}>*/}
            {/*  <Text variant="body_medium">*/}
            {/*    {state_here.MyEmojiColorReducer.details.emoji}*/}
            {/*  </Text>*/}
            {/*</View>*/}
            <StyledFastImage35
              source={{
                uri: 'https://i.postimg.cc/YCL0q94W/red-icon.png',
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
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
