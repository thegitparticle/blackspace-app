import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MiscTile() {
  function PrivacyPolicy() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/eye_icon.png')}
          />
          <Text style={styles.listitem_title}>Privacy Policy</Text>
        </View>
        <Iconly
          name="ChevronRightBold"
          color={themeHere.colors.foreground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  function TermsAndConditions() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/defender_icon.png')}
          />
          <Text style={styles.listitem_title}>Terms & Conditions</Text>
        </View>
        <Iconly
          name="ChevronRightBold"
          color={themeHere.colors.foreground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  function Logout() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/logout_icon.png')}
          />
          <Text style={styles.listitem_title}>Logout</Text>
        </View>
        <Iconly
          name="ChevronRightBold"
          color={themeHere.colors.foreground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={styles.title_text}>MISC</Text>
      <PrivacyPolicy />
      <TermsAndConditions />
      <Logout />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MiscTile);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    backgroundColor: themeHere.colors.off_background,
    width: windowWidth - 40,
    borderRadius: 15,
    marginBottom: 30,
  },
  title_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground + '50',
    paddingVertical: 25,
  },
  listitem_view: {
    width: windowWidth - 90,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listitem_leftside_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listitem_icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  listitem_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 25,
  },
});
