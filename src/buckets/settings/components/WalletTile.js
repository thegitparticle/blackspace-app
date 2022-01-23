import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {Text, View, Image} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Iconly from '../../../miscsetups/customfonts/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WalletTile() {
  function BaseFiatCurrency() {
    return (
      <TouchableOpacity>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/dollar_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              Base Currency
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function WalletBackup() {
    return (
      <TouchableOpacity>
        <View
          sx={{
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          variant="layout.sub_view_50_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              variant="images.small_icon_25_round"
              source={require('../../../../assets/icloud_icon.png')}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'foreground'}}>
              iCloud Backup
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      sx={{
        backgroundColor: 'off_background',
        borderRadius: 15,
        marginBottom: '$6',
        alignItems: 'center',
      }}
      variant="layout.sub_view_20_margin">
      <Text
        variant="subhead_medium"
        sx={{
          paddingVertical: '$5',
          color: 'foreground',
          opacity: 0.25,
        }}>
        WALLET
      </Text>
      <BaseFiatCurrency />
      <WalletBackup />
    </View>
  );
}

export default WalletTile;
