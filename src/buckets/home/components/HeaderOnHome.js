import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
  Image,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';
import {Avatar, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle/src/index';
import Iconly from '../../../miscsetups/customfonts/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HeaderOnHome() {
  const navigation = useNavigation();

  const HeaderLeft = useMemo(
    () =>
      function HeaderLeftX() {
        return (
          <Pressable
            style={styles.settings_icon_view}
            // onPress={() => navigation.navigate('TheAyeStackScreens')}
          >
            <Iconly
              name="SettingBold"
              color={themeHere.colors.icon}
              size={15}
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
            // onPress={() => navigation.navigate('MyProfileModalScreens')}
            style={styles.header_right_view_wrap}>
            <FastImage
              style={styles.header_right_image}
              source={{
                uri: 'https://i.postimg.cc/7hSZWDz1/photo-1541562232579-512a21360020.jpg',
                priority: FastImage.priority.normal,
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
        onPress={() => navigation.navigate('TestStack')}
        style={styles.header_middle_view_wrap}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/bs_logo_red_bg.png')}
        />
      </Pressable>
    );
  }

  const HeaderView = useMemo(
    () =>
      function HeaderView() {
        return (
          <SquircleView
            style={styles.header_squircle_view}
            squircleParams={{
              cornerSmoothing: 0.7,
              cornerRadius: 30,
              fillColor: themeHere.colors.background,
            }}>
            <View style={styles.header_items_view_wrap}>
              <HeaderLeft />
              <HeaderMiddle />
              <HeaderRight />
            </View>
          </SquircleView>
        );
      },
    [],
  );

  return (
    <View style={styles.parent_view}>
      <Header
        ViewComponent={HeaderView}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'light-content'}
        containerStyle={styles.header_container}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HeaderOnHome);

const styles = StyleSheet.create({
  parent_view: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
    height: windowHeight * 0.125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    // shadowColor: themeHere.colors.mid_ground,
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 40,
  },
  settings_icon_view: {
    backgroundColor: themeHere.colors.icon_background,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  header_left_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  header_right_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: themeHere.colors.red,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  header_right_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  header_middle_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    width: 105,
    height: 30,
  },
  header_squircle_view: {
    width: windowWidth,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: themeHere.colors.mid_gray,
    // shadowOffset: {
    //   width: 0,
    //   height: 75,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 16.68,
    // elevation: 11,
  },
  header_items_view_wrap: {
    width: windowWidth * 0.9,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
  },
});
