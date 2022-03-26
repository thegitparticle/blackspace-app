import React, { useState } from "react";
import { Appearance, Dimensions, TouchableOpacity } from "react-native";
import { Image, Text, View } from "dripsy";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import Iconly from "../../../miscsetups/customfonts/Iconly";
import { Modal, ModalContent, ScaleAnimation } from "react-native-modals";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WalletTile() {
  const [showPopup, setShowPopup] = useState(false);

  function BaseFiatCurrency() {
    return (
      <TouchableOpacity onPress={() => setShowPopup(true)}>
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
      <Modal
        visible={showPopup}
        initialValue={0}
        useNativeDriver={true}
        modalStyle={{backgroundColor: 'transparent'}}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowPopup(false);
        }}>
        <ModalContent>
          <View variant="layout.info_popup">
            <Text
              variant="header_bold"
              sx={{color: 'foreground', mt: '$4', mb: '$8'}}>
              Base Currency
            </Text>
            <Text variant="subhead_medium" sx={{color: 'foreground', mb: '$4'}}>
              $ US Dollar
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'foreground', mb: '$4', opacity: 0.5}}>
              ₹ Indian Rupee (coming soon)
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'foreground', mb: '$4', opacity: 0.5}}>
              € Euro (coming soon)
            </Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

export default WalletTile;
