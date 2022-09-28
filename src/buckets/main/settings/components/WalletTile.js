import {Text, View} from 'dripsy';
import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
            alignSelf: 'center',
          }}
          variant="layout.sub_view_40_margin">
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <StyledCircleFastImage25
              source={require('../../../../../assets/dollar_icon.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{marginHorizontal: '$5', color: 'layout_1'}}>
              Base Currency
            </Text>
          </View>
          <Iconly
            name="ChevronRightBold"
            color={dripsytheme.colors.layout_1}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      sx={{
        backgroundColor: 'layout_4',
        borderRadius: 15,
        marginBottom: '$6',
        alignSelf: 'center',
      }}
      variant="layout.sub_view_20_margin">
      <Text
        variant="body_thick"
        sx={{
          paddingVertical: '$5',
          color: 'layout_1',
          opacity: 0.25,
          alignSelf: 'center',
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
              variant="heading_thick"
              sx={{color: 'layout_1', mt: '$4', mb: '$8'}}>
              Base Currency
            </Text>
            <Text variant="body_thick" sx={{color: 'layout_1', mb: '$4'}}>
              $ US Dollar
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'layout_1', mb: '$4', opacity: 0.5}}>
              ₹ Indian Rupee (coming soon)
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'layout_1', mb: '$4', opacity: 0.5}}>
              € Euro (coming soon)
            </Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

export default WalletTile;
