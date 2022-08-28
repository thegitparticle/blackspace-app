import Clipboard from '@react-native-clipboard/clipboard';
import {Text, useSx, View} from 'dripsy';
import React from 'react';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {dripsytheme} from '../../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function MainDetailsETH() {
  let wallet_add = state_here.UserDetailsReducer.userdetails.wallet_address;
  let render_wallet_string =
    wallet_add.slice(0, 4) + '...' + wallet_add.slice(-2);

  const sxCustom = useSx();

  const copyToClipboard = () => {
    Clipboard.setString(wallet_add);
    showMessage({
      message: 'wallet address copied',
      type: 'success',
      backgroundColor: dripsytheme.colors.success_2,
    });
  };

  const clickOnDpAction = () => {
    showMessage({
      message: 'you will soon to able to add your NFT as DP',
      type: 'success',
      backgroundColor: dripsytheme.colors.brand_blue,
    });
  };

  return (
    <View
      variant="sub_view_0_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        mt: '$4',
      }}>
      <Bounceable onPress={clickOnDpAction}>
        <FastImage
          style={sxCustom({
            width: 100,
            height: 100,
            borderRadius: 50,
            marginVertical: '$2',
          })}
          source={{
            uri: 'https://i.postimg.cc/YCL0q94W/red-icon.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Bounceable>
      <Text
        variant="body_thick"
        sx={{
          color: 'layout_1',
          my: '$2',
        }}>
        {state_here.UserDetailsReducer.userdetails.username}
      </Text>
      <Bounceable onPress={copyToClipboard}>
        <View
          sx={{
            flexDirection: 'row',
            my: '$2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            variant="body_thick"
            sx={{
              color: 'layout_1',
              opacity: 0.5,
              maxWidth: windowWidth * 0.2,
              mx: '$2',
            }}>
            {render_wallet_string}
          </Text>
          <Icon
            name="copy"
            type="feather"
            color={dripsytheme.colors.layout_1 + '50'}
            size={16}
          />
        </View>
      </Bounceable>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MainDetailsETH);
