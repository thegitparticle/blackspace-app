import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions, Pressable, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SpacerVertical from '../../../../bits/SpacerVertical';
import SquircleButton from '../../../../bits/SquircleButton';
import {
  use0xSwapQuote,
  use0xSwapQuoteWithBalanceChecks,
} from '../../../../helpers/use0xSwapQuote';
import useEthFiatPrice from '../../../../helpers/useEthFiatPrice';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import useGetETHBalance from '../../../../helpers/useGetETHBalance';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function PoSPoolScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const {poolData} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wallet_address = state_here.WDeetsReducer.wdeets.wallet_address;

  const {loadingPriceEth, priceEth} = useEthFiatPrice();

  // for ETH to stETH swap on Mainnet (chainID 1) only
  const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
    use0xSwapQuote(
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      1,
      18,
      wallet_address,
    );

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
              uri: poolData.pool_logo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{backgroundColor: dripsytheme.colors.layout_1}}
          />
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            {poolData.pool_name} - {poolData.token_symbol}
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
    const [amountStake, setAmountStake] = useState('');

    const [showBalanceCheckPopup, setShowBalanceCheckPopup] = useState(false);
    const [passedToken0BalCheck, setPassedToken0BalCheck] = useState(false);

    function SwapButton() {
      if (amountStake.length > 0) {
        return (
          <Bounceable onPress={() => setShowBalanceCheckPopup(true)}>
            <View sx={{marginVertical: '$3'}}>
              <SquircleButton
                buttonColor={dripsytheme.colors.success_3}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'swap'}
                font={dripsytheme.text.body_thick}
                textColor={dripsytheme.colors.layout_1}
              />
            </View>
          </Bounceable>
        );
      } else {
        return (
          <Bounceable onPress={() => setShowBalanceCheckPopup(true)}>
            <View sx={{marginVertical: '$3'}}>
              <SquircleButton
                buttonColor={dripsytheme.colors.layout_1 + '10'}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'swap'}
                font={dripsytheme.text.body_thick}
                textColor={dripsytheme.colors.layout_1}
              />
            </View>
          </Bounceable>
        );
      }
    }

    function BalanceCheckPopup() {
      const {
        loading0xSwapQuoteWithChecks,
        quoteDetails0xWithChecks,
        quoteDetails0xRawWithChecks,
        quoteError0xWithChecks,
      } = use0xSwapQuoteWithBalanceChecks(
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
        amountStake,
        18,
        wallet_address,
      );

      function Token0Balance() {
        if (!loading0xSwapQuoteWithChecks) {
          if (quoteError0xWithChecks) {
            setPassedToken0BalCheck(true);
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
                  You have enough ETH balance
                </Text>
                <Pressable
                  onPress={() => {
                    setShowBalanceCheckPopup(false);
                    navigation.navigate('PoSTxnScreen', {
                      swapQuote: quoteDetails0xWithChecks,
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
                  You don't have enough ETH balance
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
                Checking ETH balance
              </Text>
            </View>
          );
        }
      }

      return (
        <View variant="layout.info_popup">
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', mt: '$4', mb: '$8'}}>
            Balance Check
          </Text>
          <Token0Balance />
        </View>
      );
    }

    if (poolData.token_symbol === 'ETH') {
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
              height: 50,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '$3',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: dripsytheme.colors.layout_1 + '10',
            }}>
            <TextInput
              numberOfLines={1}
              value={amountStake}
              onChangeText={input => setAmountStake(input)}
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
                paddingHorizontal: '$3',
              })}
              placeholder={'how much ETH to stake?'}
              placeholderTextColor={dripsytheme.colors.layout_1 + 50}
            />
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              {amountStake.length > 0
                ? '$ ' +
                  Number(Number(amountStake) * Number(priceEth)).toFixed(2)
                : ''}
            </Text>
          </SquircleView>
          <RenderDetail
            title={'you will get'}
            value={
              !loading0xSwapQuote && amountStake.length > 1
                ? `${(
                    Number(amountStake) * Number(quoteDetails0x.price)
                  ).toFixed(2)} stETH`
                : '- - -'
            }
          />
          <RenderDetail
            title={'exchange rate'}
            value={
              loading0xSwapQuote
                ? '- - -'
                : `1 ETH = ${Number(quoteDetails0x.price).toFixed(2)} stETH`
            }
          />
          <RenderDetail
            title={'transaction fee'}
            value={
              quoteDetails0x
                ? `$ ${Number(
                    Number(quoteDetails0x.gasPrice) *
                      Number(priceEth) *
                      Number(quoteDetails0x.gas) *
                      10 ** -18,
                  ).toFixed(2)}`
                : '- - -'
            }
          />
          <SwapButton />
          <Modal
            visible={showBalanceCheckPopup}
            initialValue={0}
            useNativeDriver={true}
            modalStyle={{backgroundColor: 'transparent'}}
            modalAnimation={new ScaleAnimation()}
            onTouchOutside={() => {
              setShowBalanceCheckPopup(false);
              setPassedToken0BalCheck(false);
            }}>
            <ModalContent>
              <BalanceCheckPopup />
            </ModalContent>
          </Modal>
        </SquircleView>
      );
    } else {
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
              height: 50,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '$3',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: dripsytheme.colors.layout_1 + '10',
            }}>
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              Polygon PoS Chain & staking support will be enabled soon!
            </Text>
          </SquircleView>
        </SquircleView>
      );
    }
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
            title={'Annual % Rate'}
            value={poolData.interest_rate}
            highlight={true}
          />
          <RenderDetail
            title={'Total staked via Lido'}
            value={poolData.total_staked_amount}
          />
          <RenderDetail
            title={'Total staked via Lido ($USD)'}
            value={poolData.total_staked_amount_usd}
          />
          {/* <RenderDetail
            title={'Stakers'}
            value={poolData.total_staked_amount_usd}
          /> */}
          <RenderDetail
            title={'Reward Fee (%)'}
            value={poolData.interest_rate}
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

    let faqsHere = poolData.faqs;

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
        {faqsHere.map((item, index) => (
          <RenderFAQ question={item.question} answer={item.answer} />
        ))}
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

export default connect(mapStateToProps)(PoSPoolScreen);
