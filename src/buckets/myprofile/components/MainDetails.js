import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MainDetails() {
  let wallet_add = state_here.WDeetsReducer.wdeets.wallet_address;
  let render_wallet_string =
    wallet_add.slice(0, 4) + '...' + +wallet_add.slice(-2);

  return (
    <View style={styles.parent_view}>
      <Pressable style={styles.dp_view_wrap}>
        <FastImage
          style={styles.dp_image}
          source={{
            uri: 'https://i.postimg.cc/7hSZWDz1/photo-1541562232579-512a21360020.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Pressable>
      <Text style={styles.username_text}>
        {state_here.MyProfileReducer.myProfileDetails.username}
      </Text>
      <Pressable style={styles.wallet_view_wrap}>
        <Text style={styles.wallet_text}>{render_wallet_string}</Text>
        <Icon
          name="copy"
          type="feather"
          color={themeHere.colors.foreground + '50'}
          size={16}
        />
      </Pressable>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MainDetails);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'center',
    marginTop: 20,
  },
  dp_view_wrap: {
    marginVertical: 10,
  },
  dp_image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginVertical: 10,
  },
  wallet_view_wrap: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wallet_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground + '50',
    maxWidth: windowWidth * 0.2,
    marginHorizontal: 10,
  },
});
