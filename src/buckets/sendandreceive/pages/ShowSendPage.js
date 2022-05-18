import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {View, Text, TextInput} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useNavigation} from '@react-navigation/native';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {connect} from 'react-redux';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {Bounceable} from 'rn-bounceable';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import _ from 'lodash';
import useEthFiatPrice from '../../../helpers/useEthFiatPrice';
import {useGasPriceETH} from '../../../helpers/useGasPriceETH';
import {useGasCostEstimate} from '../../../dapps/pooltogether/helpers/useGasCostEstimate';
import {BigNumber} from 'ethers';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import {showMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function ShowSendPage() {
  // props - ChangeBodyBack

  const navigation = useNavigation();

  const wallet_address =
    state_here.UserDetailsReducer.userdetails.wallet_address;
  const wallet_connected = state_here.WDeetsReducer.wdeets.wallet_connected;
  const myProfileDetails = state_here.MyProfileReducer.myProfileDetails;
  const myTokens = state_here.MyTokenBalancesReducer.tokens;

  function HeaderHere() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
          flexDirection: 'row',
          height: 75,
        }}>
        <Pressable style={{padding: 20}}>
          <Iconly
            name="SettingBold"
            color={themeHere.colors.foreground + '00'}
            size={25}
          />
        </Pressable>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: themeHere.colors.foreground,
          }}>
          SEND
        </Text>
        <Pressable style={{padding: 20}} onPress={() => navigation.goBack()}>
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground}
            size={25}
          />
        </Pressable>
      </View>
    );
  }

  const {loadingEth, priceEth} = useEthFiatPrice();

  let ethTokenObject = {
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    tokenBalance_decimal: Number(myProfileDetails.eth_balance),
    token_price_usd: Number(myProfileDetails.eth_balance) * priceEth,
  };

  const modalizePickCoinRef = useRef(null);

  const onOpenPickCoin = () => {
    modalizePickCoinRef.current?.open();
  };

  const onClosePickCoin = () => {
    modalizePickCoinRef.current?.close();
  };

  const [coinToSend, setCoinToSend] = useState(ethTokenObject);

  function PickCoinListHeader() {
    return (
      <SquircleView
        style={{width: windowWidth, alignItems: 'center'}}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.off_background,
        }}>
        <Text
          style={{
            ...themeHere.text.subhead_bold,
            color: themeHere.colors.foreground,
            marginVertical: 30,
            textAlign: 'center',
          }}>
          choose which token to send
        </Text>
      </SquircleView>
    );
  }

  function RenderCoinListItem(item) {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          width: windowWidth,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setCoinToSend(item.item);
          onClosePickCoin();
        }}>
        <>
          <FastImage
            source={{
              uri: item.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginLeft: 20,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              ...themeHere.text.subhead_bold,
              color: themeHere.colors.foreground,
              marginHorizontal: 10,
            }}>
            {item.item.name}
          </Text>
        </>
        <Text
          style={{
            ...themeHere.text.body_medium,
            color: themeHere.colors.foreground + '50',
            marginHorizontal: 10,
          }}>
          {item.item.symbol}
        </Text>
      </TouchableOpacity>
    );
  }

  const [walletAddressToSend, setWalletAddressToSend] = useState('');
  const [amountToSend, setAmountToSend] = useState(0);
  const [showConfirmTransactionPopup, setShowConfirmTransactionPopup] =
    useState(false);

  const {totalGasWei, totalGasUsd, isApproveFetched} = useGasCostEstimate(
    BigNumber.from('60000'),
    1,
  );

  const sendTransaction = () => {
    if (walletAddressToSend.length > 3) {
      if (Number(amountToSend) > 0) {
        if (wallet_connected) {
          console.log('send to metamask');
          // navigate to metamask
        } else {
          setShowConfirmTransactionPopup(true);
        }
      } else {
        showMessage({
          message: 'enter amount to send',
          type: 'danger',
          backgroundColor: themeHere.colors.red,
        });
      }
    } else {
      showMessage({
        message: 'enter wallet address to send',
        type: 'danger',
        backgroundColor: themeHere.colors.red,
      });
    }
  };

  return (
    <View sx={{flex: 1}}>
      <HeaderHere />
      <Text
        variant="subhead_medium"
        sx={{
          color: 'foreground',
          opacity: 0.75,
          marginTop: '$4',
          marginBottom: '$2',
          marginHorizontal: '$8',
        }}>
        enter wallet address to send
      </Text>
      <SquircleView
        style={{
          width: windowWidth * 0.8,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 10,
          fillColor: themeHere.colors.off_background,
        }}>
        <TextInput
          sx={{
            color: 'foreground',
            ...themeHere.text.subhead,
            width: windowWidth * 0.7,
            height: 50,
          }}
          numberOfLines={1}
          onChangeText={value => {
            setWalletAddressToSend(value);
          }}
          value={walletAddressToSend}
        />
      </SquircleView>
      <Text
        variant="subhead_medium"
        sx={{
          color: 'foreground',
          opacity: 0.75,
          marginTop: '$4',
          marginBottom: '$2',
          marginHorizontal: '$8',
        }}>
        how much to send?
      </Text>
      <SquircleView
        style={{
          width: windowWidth * 0.8,
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
        }}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 10,
          fillColor: themeHere.colors.off_background,
        }}>
        <TextInput
          sx={{
            ...themeHere.text.subhead,
            color: 'foreground',
            width: windowWidth * 0.4,
            height: 50,
            marginHorizontal: 10,
          }}
          numberOfLines={1}
          onChangeText={value => {
            setAmountToSend(value);
          }}
          value={amountToSend}
          placeholder={'0.0'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <Bounceable onPress={() => onOpenPickCoin()}>
          <SquircleView
            style={{
              height: 50,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FastImage
              source={{
                uri: coinToSend.logoURI,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            />
            <Text
              style={{
                ...themeHere.text.subhead_bold,
                color: themeHere.colors.foreground,
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              {coinToSend.symbol}
            </Text>
            <View style={{paddingHorizontal: 5}}>
              <Iconly
                name="ChevronDownBroken"
                color={themeHere.colors.foreground}
                size={25}
              />
            </View>
          </SquircleView>
        </Bounceable>
      </SquircleView>
      <Text
        sx={{
          ...themeHere.text.body_medium,
          color: themeHere.colors.foreground + '75',
          marginHorizontal: '$8',
          marginTop: '$2',
          marginBottom: '$6',
        }}>
        ~ $ {Number(Number(amountToSend) * Number(priceEth)).toFixed(2)}
      </Text>
      <View
        sx={{
          width: windowWidth * 0.8,
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <Text
          variant="subhead_medium"
          sx={{
            color: 'foreground',
            opacity: 0.5,
            marginTop: '$4',
            marginBottom: '$2',
          }}>
          transaction gas fees
        </Text>
        <Text
          variant="subhead_medium"
          sx={{
            color: 'foreground',
            opacity: 1,
            marginTop: '$4',
            marginBottom: '$2',
          }}>
          ${' '}
          {Number(totalGasUsd) > 1
            ? Number(Number(totalGasUsd) * 10 ** -18).toFixed(2)
            : 0}
        </Text>
      </View>
      <View
        sx={{
          width: windowWidth * 0.8,
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: '$4',
        }}>
        <Bounceable>
          <SquircleView
            style={{
              width: windowWidth * 0.35,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: themeHere.colors.off_background,
            }}>
            <Text
              variant="subhead_medium"
              sx={{
                color: 'red',
                opacity: 1,
              }}>
              cancel
            </Text>
          </SquircleView>
        </Bounceable>
        <Bounceable onPress={() => sendTransaction()}>
          <SquircleView
            style={{
              width: windowWidth * 0.35,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: themeHere.colors.success_green_dark,
            }}>
            <Text
              variant="subhead_medium"
              sx={{
                color: 'foreground',
                opacity: 1,
              }}>
              send
            </Text>
          </SquircleView>
        </Bounceable>
      </View>
      <Modal
        visible={showConfirmTransactionPopup}
        initialValue={0}
        useNativeDriver={true}
        modalStyle={{backgroundColor: 'transparent'}}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowConfirmTransactionPopup(false);
        }}>
        <ModalContent>
          <View variant="layout.info_popup">
            <Text
              variant="subhead_medium"
              sx={{color: 'foreground', mt: '$4', mb: '$8', opacity: 0.5}}>
              Are you sure to send?
            </Text>
            <Text variant="header_bold" sx={{color: 'foreground', mb: '$8'}}>
              {amountToSend} {coinToSend.symbol}
            </Text>
            <Bounceable onPress={() => sendTransaction()}>
              <SquircleView
                style={{
                  width: windowWidth * 0.7,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 10,
                  fillColor: themeHere.colors.success_green_dark,
                }}>
                <Text
                  variant="subhead_medium"
                  sx={{
                    color: 'foreground',
                    opacity: 1,
                  }}>
                  send
                </Text>
              </SquircleView>
            </Bounceable>
          </View>
        </ModalContent>
      </Modal>
      <Portal>
        <Modalize
          ref={modalizePickCoinRef}
          modalStyle={{
            backgroundColor: themeHere.colors.off_background,
            width: windowWidth,
            height: windowHeight * 0.5,
          }}
          flatListProps={{
            data: _.concat(ethTokenObject, myTokens),
            renderItem: RenderCoinListItem,
            keyExtractor: item => item.symbol,
            showsVerticalScrollIndicator: false,
            ListHeaderComponent: PickCoinListHeader(),
          }}
        />
      </Portal>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ShowSendPage);
