import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
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
            style={styles.header_left_view_wrap}
            onPress={() => navigation.navigate('TheAyeStackScreens')}>
            <Iconly name="SettingBold" color="#000" size={25} />
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
            onPress={() => navigation.navigate('MyProfileModalScreens')}
            style={styles.header_right_view_wrap}>
            <Avatar
              rounded
              containerStyle={styles.header_right_image}
              size={45}
              source={{
                uri: 'https://i.postimg.cc/7hSZWDz1/photo-1541562232579-512a21360020.jpg',
              }}
            />
          </Pressable>
        );
      },
    [],
  );

  function HeaderMiddle() {
    return <View />;
  }
  const HeaderView = useMemo(
    () =>
      function HeaderView() {
        return (
          <SquircleView
            style={{
              width: windowWidth,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#00000025',
              shadowOffset: {
                width: 0,
                height: 75,
              },
              shadowOpacity: 0.36,
              shadowRadius: 16.68,
              elevation: 11,
            }}
            squircleParams={{
              cornerSmoothing: 0.7,
              cornerRadius: 30,
              fillColor: '#F8F8F8',
            }}>
            <View
              style={{
                width: windowWidth * 0.9,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
                height: '100%',
              }}>
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
        barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
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
    borderColor: 'indianred',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  header_left_image: {
    width: 35 * 1.8,
    height: 35,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  header_right_image: {
    marginHorizontal: 10,
  },
  header_title_this_page: {
    fontSize: 25,
    fontFamily: 'GothamRounded-Medium',
    marginHorizontal: 10,
  },
  header_title_this_page_view: {
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
    height: windowHeight * 0.06,
  },
});
