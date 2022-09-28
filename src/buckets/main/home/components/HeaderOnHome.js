import {Amplitude} from '@amplitude/react-native';
import {useNavigation} from '@react-navigation/native';
import {useSx, View} from 'dripsy';
import React, {useMemo} from 'react';
import {Appearance, Dimensions, Pressable} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {StyledCircleFastImage30} from '../../../../theme/DripsyTheme';

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
            style={sxCustom({paddingVertical: '$2', paddingHorizontal: '$4'})}>
            <StyledCircleFastImage30
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
            style={sxCustom({paddingVertical: '$2', paddingHorizontal: '$4'})}>
            <Iconly name="WalletBold" color={'#FAFAFA'} size={30} />
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
        }}
      />
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
