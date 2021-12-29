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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WalletTile() {
  function DefaultCrypto() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/crypto_bitcoin_icon.png')}
          />
          <Text style={styles.listitem_title}>Wallet Default Crypto</Text>
        </View>
        <Iconly
          name="ChevronRightBold"
          color={themeHere.colors.foreground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  function BaseFiatCurrency() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/dollar_icon.png')}
          />
          <Text style={styles.listitem_title}>Base Currency</Text>
        </View>
        <Iconly
          name="ChevronRightBold"
          color={themeHere.colors.foreground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  function WalletBackup() {
    return (
      <TouchableOpacity style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image
            style={styles.listitem_icon}
            source={require('../../../../assets/icloud_icon.png')}
          />
          <Text style={styles.listitem_title}>iCloud Backup</Text>
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
      <Text style={styles.title_text}>WALLET</Text>
      <DefaultCrypto />
      <BaseFiatCurrency />
      <WalletBackup />
    </View>
  );
}

export default WalletTile;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    backgroundColor: themeHere.colors.off_background,
    width: windowWidth - 40,
    borderRadius: 15,
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
