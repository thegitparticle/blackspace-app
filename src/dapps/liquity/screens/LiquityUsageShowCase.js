import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {Text, View, Image, useSx, styled} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import {
  SquircleCard,
  StyledFastImage25,
  StyledFastImage30,
  StyledFastImage50,
  StyledFastImage60,
} from '../../../theme/DripsyTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import BottomSpacer from '../../../bits/BottomSpacer';
import useEthFiatPrice from '../../../helpers/useGetEthFiatPrice';
import {EthersLiquity} from '@liquity/lib-ethers';
import {ethers} from 'ethers';
import {connect} from 'react-redux';
import useLUSDFiatPrice from '../helpers/useLUSDFiatPrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*

need 2 cards

what to track?
  a. borrowed debt
    - borrow amount
    - option to payback

  b. collateral given
    - coll given in ETH (and usd)
    - supply more
    - liquidation price
    - current eth price
    - withdraw button (show -> payback debt first - will auto withdraw your coll)
 */

let state_here = {};

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function LiquityUsageShowCase() {
  const navigation = useNavigation();
  let walletAddress = state_here.WDeetsReducer.wdeets.wallet_address;
  let wallet = new ethers.Wallet(
    state_here.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const {loadingEth, priceEth} = useEthFiatPrice();
  const {loadingPriceLUSD, priceLUSD} = useLUSDFiatPrice();

  const [liquity, setLiquity] = useState();
  const [trove, setTrove] = useState(null);

  useEffect(() => {
    (async () => {
      setLiquity(await EthersLiquity.connect(walletSigner));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let troves = await liquity.getTrove(walletAddress);
      setTrove(troves);
      console.log(ethers.utils.formatEther(troves.debt._bigNumber));
    })();
  }, [liquity]);

  function DebtCard() {
    return (
      <SquircleCard
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.mid_ground + '25',
        }}>
        <Text
          variant="header_bold"
          sx={{
            color: 'foreground',
            opacity: 0.75,
            marginVertical: '$4',
            marginHorizontal: '$4',
            alignSelf: 'center',
          }}>
          DEBT
        </Text>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: '$4',
          }}>
          <View
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledFastImage25
                source={{
                  uri: 'https://i.postimg.cc/4d53xMqN/128-lusd-icon.png',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                variant="title_1"
                sx={{
                  color: 'foreground',
                  textAlign: 'center',
                  marginHorizontal: '$2',
                }}>
                {Number(
                  ethers.utils.formatEther(trove.debt._bigNumber),
                ).toFixed(2)}
              </Text>
              <Text
                variant="header_bold"
                sx={{
                  color: 'foreground',
                  opacity: 0.75,
                  textAlign: 'center',
                  // marginHorizontal: '$2',
                }}>
                LUSD
              </Text>
            </View>
            <View
              sx={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: '$4',
              }}>
              <Text
                variant="header_medium"
                sx={{
                  color: 'foreground',
                  textAlign: 'center',
                  opacity: 0.75,
                }}>
                ~ ${' '}
                {(
                  Number(ethers.utils.formatEther(trove.debt._bigNumber)) *
                  Number(priceLUSD)
                ).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      </SquircleCard>
    );
  }

  function CollateralCard() {
    return (
      <SquircleCard
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.mid_ground + '25',
        }}>
        <Text
          variant="header_bold"
          sx={{
            color: 'foreground',
            opacity: 0.75,
            marginVertical: '$4',
            marginHorizontal: '$4',
            alignSelf: 'center',
          }}>
          COLLATERAL
        </Text>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: '$4',
          }}>
          <View
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledFastImage25
                source={{
                  uri: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                variant="title_1"
                sx={{
                  color: 'foreground',
                  textAlign: 'center',
                  marginHorizontal: '$2',
                }}>
                {Number(
                  ethers.utils.formatEther(trove.collateral._bigNumber),
                ).toFixed(2)}
              </Text>
              <Text
                variant="header_bold"
                sx={{
                  color: 'foreground',
                  opacity: 0.75,
                  textAlign: 'center',
                }}>
                ETH
              </Text>
            </View>
            <View
              sx={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: '$4',
              }}>
              <Text
                variant="header_medium"
                sx={{
                  color: 'foreground',
                  textAlign: 'center',
                  opacity: 0.75,
                }}>
                ~ ${' '}
                {(
                  Number(
                    ethers.utils.formatEther(trove.collateral._bigNumber),
                  ) * Number(priceEth)
                ).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
                opacity: 0.5,
                textAlign: 'center',
                marginHorizontal: '$4',
              }}>
              liquidation 1 ETH price
            </Text>
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
                textAlign: 'center',
                marginHorizontal: '$4',
              }}>
              ~ ${' '}
              {(
                (1.11 *
                  Number(ethers.utils.formatEther(trove.debt._bigNumber))) /
                Number(ethers.utils.formatEther(trove.collateral._bigNumber))
              ).toFixed(0)}
            </Text>
          </View>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '$2',
              marginBottom: '$4',
            }}>
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
                opacity: 0.5,
                textAlign: 'center',
                marginHorizontal: '$4',
              }}>
              current 1 ETH price
            </Text>
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
                textAlign: 'center',
                marginHorizontal: '$4',
              }}>
              ~ $ {Number(priceEth).toFixed(0)}
            </Text>
          </View>
        </View>
      </SquircleCard>
    );
  }

  function RenderBody() {
    if (trove === null) {
      return <View />;
    } else {
      return (
        <View sx={{alignItems: 'center', justifyContent: 'center'}}>
          <BottomSpacer height={20} />
          <DebtCard />
          <BottomSpacer height={20} />
          <View>
            <Button
              title={'payback debt'}
              type={'solid'}
              onPress={() => navigation.goBack()}
              containerStyle={{alignSelf: 'center', marginBottom: 30}}
              buttonStyle={{
                width: windowWidth * 0.5,
                height: 50,
                borderRadius: 25,
              }}
              titleStyle={{...themeHere.text.body_medium, color: 'white'}}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [themeHere.colors.red, themeHere.colors.red_dark],
              }}
            />
          </View>
          <CollateralCard />
          <BottomSpacer height={20} />
          <View>
            <Button
              title={'add collateral'}
              type={'solid'}
              onPress={() => navigation.goBack()}
              containerStyle={{alignSelf: 'center', marginBottom: 30}}
              buttonStyle={{
                width: windowWidth * 0.5,
                height: 50,
                borderRadius: 25,
              }}
              titleStyle={{...themeHere.text.body_medium, color: 'white'}}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [themeHere.colors.mid_ground + '50'],
              }}
            />
          </View>
        </View>
      );
    }
  }

  return <RenderBody />;
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(LiquityUsageShowCase);
