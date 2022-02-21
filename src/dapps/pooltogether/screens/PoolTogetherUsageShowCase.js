import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, View, Image, useSx, styled} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {DrawCalculatorAPI, PrizePoolNetwork} from '@pooltogether/v4-client-js';
import {mainnet} from '@pooltogether/v4-pool-data';
import {BigNumber, ethers} from 'ethers';
import {connect} from 'react-redux';
import Compound from '@compound-finance/compound-js';
import {SquircleCard, StyledFastImage25} from '../../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import Spacer from '../../../bits/Spacer';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const prov = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const providers = {
  1: prov,
  137: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    'https://api.avax.network/ext/bc/C/rpc',
  ),
};

function PoolTogetherUsageShowCase() {
  const [poolNetwork, setPoolNetwork] = useState();
  const [ptBalance, setPtBalance] = useState(null);
  const [drawIds, setDrawIds] = useState(null);

  const navigation = useNavigation();

  let walletAddress = state_here.WDeetsReducer.wdeets.wallet_address;
  let wallet = new ethers.Wallet(
    state_here.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const PrizePoolNtk = useMemo(
    () => new PrizePoolNetwork(providers, mainnet),
    [],
  );

  const prizePool = PrizePoolNtk.getPrizePool(
    1,
    '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be',
  );

  // const prizeDistributor = PrizePoolNtk.getPrizeDistributor(
  //   1,
  //   '0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe',
  // );

  useEffect(() => {
    (async function () {
      const balances = await prizePool
        .getUsersTicketBalance('0x1F28F10176F89F4E9985873B84d14e75751BB3D1')
        .catch(e => console.log(e));

      setPtBalance(balances);
    })().catch(console.error);
  }, [PrizePoolNtk]);

  // useEffect(() => {
  //   (async function () {
  //     const drawIds = await PrizePoolNtk.getBeaconChainDrawIds();
  //     setDrawIds(drawIds);
  //   })().catch(console.error);
  // }, [PrizePoolNtk]);

  useEffect(() => {
    (async function () {
      // const drawIds = await prizeDistributor.getValidDrawIds();

      if (drawIds !== null) {
        // const drawResults = await DrawCalculatorAPI.getUsersDrawResultsByDraws(
        //   1,
        //   '0x1F28F10176F89F4E9985873B84d14e75751BB3D1',
        //   '0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe',
        //   drawIds,
        // );
        // const drawResults =
        //   await prizeDistributor.getDrawsAndPrizeDistributions(drawIds);
        //
        // console.log(drawResults);
      }

      // const drawResults = await DrawCalculatorAPI.getUsersDrawResultsByDraws(
      //   1,
      //   '0x1F28F10176F89F4E9985873B84d14e75751BB3D1',
      //   prizeDistributorAddress,
      //   drawIds,
      // );
    })().catch(console.error);
  }, [drawIds]);

  function DepositsCard() {
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
          LOTTERY DEPOSIT
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
                  uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
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
                {Number(ethers.utils.formatUnits(ptBalance, 6)).toFixed(2)}
              </Text>
              <Text
                variant="header_bold"
                sx={{
                  color: 'foreground',
                  opacity: 0.75,
                  textAlign: 'center',
                }}>
                USDC
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
                ~ $ {Number(ethers.utils.formatEther(ptBalance)).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      </SquircleCard>
    );
  }

  function WinningsCard() {
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
          WINNINGS TILL DATE
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
                0
              </Text>
              <Text
                variant="header_bold"
                sx={{
                  color: 'foreground',
                  opacity: 0.75,
                  textAlign: 'center',
                }}>
                USDC
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
                ~ $ 0
              </Text>
            </View>
          </View>
        </View>
      </SquircleCard>
    );
  }

  function RenderBody() {
    if (ptBalance === null) {
      return (
        <View sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Spacer height={100} />
          <Bars size={10} color="#FDAAFF" />
          <Spacer height={100} />
        </View>
      );
    } else {
      return (
        <View sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Spacer height={20} />
          <DepositsCard />
          <Spacer height={20} />
          <View>
            <Button
              title={'withdraw deposit'}
              type={'solid'}
              onPress={() =>
                navigation.navigate('PTDepositWithdrawTransactionModal', {
                  withdrawAmount: Number(
                    ethers.utils.formatUnits(ptBalance, 6),
                  ).toFixed(2),
                })
              }
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
          <WinningsCard />
          <Spacer height={20} />
          {/*<View>*/}
          {/*  <Button*/}
          {/*    title={'no winnings to claim'}*/}
          {/*    type={'solid'}*/}
          {/*    containerStyle={{alignSelf: 'center', marginBottom: 30}}*/}
          {/*    buttonStyle={{*/}
          {/*      width: windowWidth * 0.5,*/}
          {/*      height: 50,*/}
          {/*      borderRadius: 25,*/}
          {/*    }}*/}
          {/*    titleStyle={{...themeHere.text.body_medium, color: 'white'}}*/}
          {/*    ViewComponent={LinearGradient}*/}
          {/*    linearGradientProps={{*/}
          {/*      colors: [themeHere.colors.mid_ground + '50'],*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</View>*/}
          <Spacer height={20} />
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PoolTogetherUsageShowCase);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
