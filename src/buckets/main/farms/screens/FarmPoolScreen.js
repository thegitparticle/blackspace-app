import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions, Pressable, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {getUSDPriceOfTokenQuick} from '../../../../bits/GetUSDPriceOfTokenQuick';
import SpacerVertical from '../../../../bits/SpacerVertical';
import SquircleButton from '../../../../bits/SquircleButton';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage25,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {FarmsFaqs} from '../FarmsData';
import _ from 'lodash';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import useGetFiatPrice from '../../../../helpers/useGetFiatPrices';
import useToken1FiatPrice from '../../../../helpers/useToken1FiatPrice';
import useToken2FiatPrice from '../../../../helpers/useToken2FiatPrice';
import useGetTokenBalance from '../../../../helpers/useGetTokenBalance';
import {BigNumber, ethers} from 'ethers';
import useGetETHBalance from '../../../../helpers/useGetETHBalance';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function FarmPoolScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const {farmData} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wallet_address = state_here.WDeetsReducer.wdeets.wallet_address;

  const farmfaqs = state_here.FarmFAQReducer.farm_faqs;

  const allTradingVols =
    state_here.HomoraTradingVolsReducer.homora_trading_vols;
  const allTokens = state_here.HomoraTokensReducer.homora_tokens;
  const {loadingTokenBalance, ethBalance} = useGetETHBalance(
    wallet_address,
    // '0x5b990C664aE7E759763ACfEC76E11c289c53Be77',
  );

  const token1Address = farmData.tokens[0];
  const token2Address = farmData.tokens[1];

  const [token1Details, setToken1Details] = useState({});
  const [token2Details, setToken2Details] = useState({});

  const [apy, setApy] = useState({});

  useEffect(() => {
    const allApys = state_here.HomoraAPYsReducer.homora_apys;

    if (farmData) {
      setApy(allApys[farmData.key]);
      setToken1Details(allTokens[token1Address]);
      setToken2Details(allTokens[token2Address]);
    }
  }, [farmData]);

  // const {loadingToken1FiatPrice, token1FiatPrice} = useToken1FiatPrice(
  //   token1Details.name,
  // );
  // const {loadingToken2FiatPrice, token2FiatPrice} = useToken2FiatPrice(
  //   token2Details.name,
  // );

  function HeaderHere() {
    return (
      <View
        variant="layout.sub_view_20_margin"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: '$3',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <StyledCircleFastImage50
            source={{
              uri:
                'https://homora-v2.alphaventuredao.io/' +
                farmData.exchange.logo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{backgroundColor: dripsytheme.colors.layout_1}}
          />
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            {farmData.name}
          </Text>
        </View>
        <Bounceable onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBroken"
            color={dripsytheme.colors.layout_1}
            size={30}
          />
        </Bounceable>
      </View>
    );
  }

  function RenderDetail({title, value, highlight}) {
    // title - string, value - string, highlight - boolean
    return (
      <View
        sx={{
          width: windowWidth - 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: '$2',
          alignItems: 'center',
        }}>
        <Text
          variant="body"
          sx={{color: 'layout_2', marginVertical: '$1', opacity: 0.75}}>
          {title}
        </Text>
        <Text
          variant="body_thick"
          sx={{color: highlight ? 'success_2' : 'layout_2'}}>
          {value}
        </Text>
      </View>
    );
  }

  function StakeComponent() {
    const [amountStake1, setAmountStake1] = useState('');
    const [amountStake2, setAmountStake2] = useState('');

    const [showBalanceCheckPopup, setShowBalanceCheckPopup] = useState(false);

    const [passedToken1BalCheck, setPassedToken1BalCheck] = useState(false);
    const [passedToken2BalCheck, setPassedToken2BalCheck] = useState(false);

    function BalanceCheckPopup() {
      function Token1Balance() {
        const {loadingTokenBalance, tokenBalance} = useGetTokenBalance(
          wallet_address,
          token1Address,
        );

        const [readableBalance, setReadableBalance] = useState(0);

        useEffect(() => {
          if (tokenBalance) {
            if (
              String(token1Address).toUpperCase() ===
              '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toUpperCase() // if wrapperETH, add to eth balance
            ) {
              setReadableBalance(
                Number(
                  ethers.utils.formatUnits(
                    tokenBalance,
                    token2Details.decimals,
                  ),
                ) + Number(ethBalance),
              );
            } else {
              setReadableBalance(
                ethers.utils.formatUnits(tokenBalance, token1Details.decimals),
              );
            }
          }
        }, [tokenBalance]);

        if (!loadingTokenBalance) {
          if (Number(readableBalance) >= Number(amountStake1)) {
            setPassedToken1BalCheck(true);
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="TickSquareBold"
                  color={dripsytheme.colors.success_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You have enough {token1Details.name} balance
                </Text>
              </View>
            );
          } else {
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="DangerBold"
                  color={dripsytheme.colors.danger_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You don't have enough {token1Details.name} balance
                </Text>
              </View>
            );
          }
        } else {
          return (
            <View sx={{alignItems: 'center'}}>
              <Bubbles size={10} color="#FFF" />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                Checking {token1Details.name} balance
              </Text>
            </View>
          );
        }
      }

      function Token2Balance() {
        const {loadingTokenBalance, tokenBalance} = useGetTokenBalance(
          wallet_address,
          token2Address,
        );

        const [readableBalance, setReadableBalance] = useState(0);

        useEffect(() => {
          if (tokenBalance) {
            if (
              String(token2Address).toUpperCase() ===
              '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toUpperCase() // if wrapperETH, add to eth balance
            ) {
              setReadableBalance(
                Number(
                  ethers.utils.formatUnits(
                    tokenBalance,
                    token2Details.decimals,
                  ),
                ) + Number(ethBalance),
              );
            } else {
              setReadableBalance(
                ethers.utils.formatUnits(tokenBalance, token2Details.decimals),
              );
            }
          }
        }, [tokenBalance]);

        if (!loadingTokenBalance) {
          if (Number(readableBalance) >= Number(amountStake2)) {
            setPassedToken2BalCheck(true);
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="TickSquareBold"
                  color={dripsytheme.colors.success_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You have enough {token2Details.name} balance
                </Text>
              </View>
            );
          } else {
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="DangerBold"
                  color={dripsytheme.colors.danger_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You don't have enough {token2Details.name} balance
                </Text>
              </View>
            );
          }
        } else {
          return (
            <View sx={{alignItems: 'center'}}>
              <Bubbles size={10} color="#FFF" />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                Checking {token2Details.name} balance
              </Text>
            </View>
          );
        }
      }

      function MakeTransactionButton() {
        if (passedToken1BalCheck && passedToken2BalCheck) {
          return (
            <Pressable
              onPress={() => {
                setShowBalanceCheckPopup(false);
                navigation.navigate('FarmTxnScreen', {
                  farmData: farmData,
                  amountStake1: amountStake1,
                  amountStake2: amountStake2,
                });
              }}>
              <View sx={{marginVertical: '$3'}}>
                <SquircleButton
                  buttonColor={dripsytheme.colors.success_3}
                  width={windowWidth * 0.7}
                  height={50}
                  buttonText={'confirm stake'}
                  font={dripsytheme.text.body_thick}
                  textColor={dripsytheme.colors.layout_1}
                />
              </View>
            </Pressable>
          );
        } else {
          return <View />;
        }
      }

      return (
        <View variant="layout.info_popup">
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', mt: '$4', mb: '$8'}}>
            Balance Checks
          </Text>
          <Token1Balance />
          <Token2Balance />
          <MakeTransactionButton />
        </View>
      );
    }

    function StakeButton() {
      if (amountStake1.length > 0 && amountStake2.length > 0) {
        return (
          <Bounceable onPress={() => setShowBalanceCheckPopup(true)}>
            <View sx={{marginVertical: '$3'}}>
              <SquircleButton
                buttonColor={dripsytheme.colors.success_3}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'stake to earn'}
                font={dripsytheme.text.body_thick}
                textColor={dripsytheme.colors.layout_1}
              />
            </View>
          </Bounceable>
        );
      } else {
        return (
          <Bounceable onPress={() => setShowBalanceCheckPopup(false)}>
            <View sx={{marginVertical: '$3'}}>
              <SquircleButton
                buttonColor={dripsytheme.colors.layout_1 + '10'}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'stake to earn'}
                font={dripsytheme.text.body_thick}
                textColor={dripsytheme.colors.layout_1}
              />
            </View>
          </Bounceable>
        );
      }
    }

    return (
      <SquircleView
        style={sxCustom({
          width: windowWidth - 40,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: '$2',
        })}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: dripsytheme.colors.layout_4,
        }}>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 70,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 10,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <TextInput
            numberOfLines={1}
            value={amountStake1}
            onChangeText={input => setAmountStake1(input)}
            keyboardType={'decimal-pad'}
            onEndEditing={() => {}}
            style={sxCustom({
              backgroundColor: 'transparent',
              ...dripsytheme.text.body_thick,
              color: dripsytheme.colors.layout_1,
              width: windowWidth / 2,
              height: 50,
              alignSelf: 'center',
              textAlign: 'left',
              paddingHorizontal: '$4',
            })}
            placeholder={'0.0'}
            placeholderTextColor={dripsytheme.colors.layout_1 + 50}
          />
          <View sx={{flexDirection: 'row', alignItems: 'center'}}>
            <StyledCircleFastImage25
              source={{
                uri:
                  'https://homora-v2.alphaventuredao.io/' + token1Details.logo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{backgroundColor: dripsytheme.colors.layout_1}}
            />
            <Text
              variant="body_thick"
              sx={{color: 'layout_1', marginHorizontal: '$2'}}>
              {token1Details.name}
            </Text>
          </View>
        </SquircleView>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 70,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 10,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <TextInput
            numberOfLines={1}
            value={amountStake2}
            onChangeText={input => setAmountStake2(input)}
            keyboardType={'decimal-pad'}
            onEndEditing={() => {}}
            style={sxCustom({
              backgroundColor: 'transparent',
              ...dripsytheme.text.body_thick,
              color: dripsytheme.colors.layout_1,
              width: windowWidth / 2,
              height: 75,
              alignSelf: 'center',
              textAlign: 'left',
              paddingHorizontal: '$4',
            })}
            placeholder={'0.0'}
            placeholderTextColor={dripsytheme.colors.layout_1 + 50}
          />
          <View sx={{flexDirection: 'row', alignItems: 'center'}}>
            <StyledCircleFastImage25
              source={{
                uri:
                  'https://homora-v2.alphaventuredao.io/' + token2Details.logo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{backgroundColor: dripsytheme.colors.layout_1}}
            />
            <Text
              variant="body_thick"
              sx={{color: 'layout_1', marginHorizontal: '$2'}}>
              {token2Details.name}
            </Text>
          </View>
        </SquircleView>
        <StakeButton />
        <Modal
          visible={showBalanceCheckPopup}
          initialValue={0}
          useNativeDriver={true}
          modalStyle={{backgroundColor: 'transparent'}}
          modalAnimation={new ScaleAnimation()}
          onTouchOutside={() => {
            setShowBalanceCheckPopup(false);
            setPassedToken1BalCheck(false);
            setPassedToken2BalCheck(false);
          }}>
          <ModalContent>
            <BalanceCheckPopup />
          </ModalContent>
        </Modal>
      </SquircleView>
    );
  }

  function PoolDetails() {
    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 40,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: '$2',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_4,
          }}>
          <RenderDetail
            title={'Total APY (%)'}
            value={apy.totalAPY + '%'}
            highlight={true}
          />
          <RenderDetail
            title={'Trading Fee APY (%)'}
            value={apy.tradingFeeAPY + '%'}
          />
          <RenderDetail
            title={'Rewards APY (%)'}
            value={apy.farmingAPY + '%'}
          />
          <RenderDetail
            title={'Trading Volume (24h)'}
            value={
              '$' +
              ' ' +
              Number(allTradingVols[farmData.key])
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </SquircleView>
      </View>
    );
  }

  function FAQs() {
    function RenderFAQ({question, answer}) {
      const [faqExpanded, setFaqExpanded] = useState(false);
      return (
        <ExpandableSection
          top={false}
          expanded={faqExpanded}
          sectionHeader={
            <View
              variant="layout.sub_view_20_margin"
              sx={{
                borderRadius: 10,
                backgroundColor: 'layout_4',
                justifyContent: 'center',
                paddingVertical: '$4',
                marginVertical: '$2',
              }}>
              <Text
                variant="body_thick"
                sx={{color: 'layout_2', marginHorizontal: '$4'}}>
                {question}
              </Text>
            </View>
          }
          onPress={() => setFaqExpanded(!faqExpanded)}>
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
            <Text
              variant="body"
              sx={{
                color: 'layout_2',
                opacity: 0.75,
                marginHorizontal: '$4',
                marginVertical: '$4',
              }}>
              {answer}
            </Text>
          </View>
        </ExpandableSection>
      );
    }

    function RenderFAQsList() {
      if (farmfaqs && farmfaqs.length > 0) {
        return (
          <View>
            {farmfaqs.map((item, index) => (
              <RenderFAQ question={item.question} answer={item.answer} />
            ))}
          </View>
        );
      } else {
        return (
          <View>
            <Text
              variant="text_thick"
              sx={{
                color: 'layout_2',
                marginHorizontal: '$4',
                marginVertical: '$2',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              No FAQs available
            </Text>
          </View>
        );
      }
    }

    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <Text
          variant="heading_thick"
          sx={{
            color: 'layout_1',
            marginHorizontal: '$4',
            marginVertical: '$2',
          }}>
          FAQs
        </Text>
        <RenderFAQsList />
      </View>
    );
  }

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={dripsytheme.colors.layout_1}
          />
        }>
        <StakeComponent />
        <PoolDetails />
        <FAQs />
        <SpacerVertical height={60} />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmPoolScreen);
